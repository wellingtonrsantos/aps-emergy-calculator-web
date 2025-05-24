import FileUpload from "@/components/FileUpload";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CalculateEmergy() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success("Cadastro realizado com sucesso!");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-green-50/20">
      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-green-900">
              Calculadora de Emergia
            </h1>
            <p className="text-green-700">
              Importe seu arquivo CSV ou Excel para começar a análise
            </p>
          </div>

          <FileUpload />
        </div>
      </main>
    </div>
  );
}

export default CalculateEmergy;
