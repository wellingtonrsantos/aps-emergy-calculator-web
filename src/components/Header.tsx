// 10. Header Atualizado (components/Header.tsx)
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Não renderizar o header se não estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-green-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {/* Placeholder para o logo */}
          <div className="flex h-10 w-40 items-center justify-center rounded bg-green-500">
            <span className="font-bold text-white">APS ENG-SW</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-green-100">Olá, {user.name}!</span>
          )}
          <Button
            variant="outline"
            className="cursor-pointer border-green-500 text-green-500 hover:bg-green-700 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
