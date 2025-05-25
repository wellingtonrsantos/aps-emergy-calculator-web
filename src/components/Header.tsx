// 10. Header Atualizado (components/Header.tsx)
import { Calculator, Upload, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
        {/* Placeholder para o logo */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex h-10 w-40 items-center justify-center rounded bg-green-700">
              <span className="text-sm font-medium text-white">
                APS - ENG.SW
              </span>
            </div>
          </div>

          {/* Navegação */}
          <nav className="hidden space-x-4 md:flex">
            <Link to="/">
              <Button
                variant="ghost"
                className={`cursor-pointer text-white hover:bg-green-700 ${
                  location.pathname === "/" ? "bg-green-700" : ""
                }`}
              >
                <Home className="mr-2 h-4 w-4" />
                Início
              </Button>
            </Link>
            <Link to="/calculate-by-file">
              <Button
                variant="ghost"
                className={`cursor-pointer text-white hover:bg-green-700 ${
                  location.pathname === "/calculate-by-file"
                    ? "bg-green-700"
                    : ""
                }`}
              >
                <Upload className="mr-2 h-4 w-4" />
                Importar Arquivo
              </Button>
            </Link>
            <Link to="/calculate-by-lci">
              <Button
                variant="ghost"
                className={`cursor-pointer text-white hover:bg-green-700 ${
                  location.pathname === "/calculate-by-lci"
                    ? "bg-green-700"
                    : ""
                }`}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Usar Base do Sistema
              </Button>
            </Link>
          </nav>
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
