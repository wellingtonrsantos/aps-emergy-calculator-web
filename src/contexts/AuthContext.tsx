import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";
import { getCurrentUser, loginUser } from "@/services/authService";
import { AuthContextType, LoginPayload, User } from "@/types/auth";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useAxiosErrorHandler();

  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("auth_token");

      if (storedToken) {
        try {
          setToken(storedToken);
          // Buscar dados do usuário usando o token
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          // Token inválido, remover do localStorage
          localStorage.removeItem("auth_token");
          setToken(null);
          setUser(null);
          handleError(error);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [handleError]);

  const login = async (credentials: LoginPayload) => {
    try {
      setIsLoading(true);
      const response = await loginUser(credentials);

      setToken(response.access_token);
      localStorage.setItem("auth_token", response.access_token);

      // Buscar dados do usuário após login
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
