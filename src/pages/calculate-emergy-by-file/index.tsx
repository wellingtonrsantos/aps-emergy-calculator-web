import FileUpload from "@/components/calculate/FileUpload";
import ResultsDisplay from "@/components/calculate/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";
import { calculateEmergyByFile } from "@/services/calculate";
import { CalculationResult } from "@/types/calculate";
import { Calculator, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CalculateEmergyByFile() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success("Cadastro realizado com sucesso!");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleError = useAxiosErrorHandler();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    if (calculationResult) {
      setCalculationResult(null);
    }
  };

  const handleCalculate = async () => {
    if (!uploadedFile) return;

    setIsCalculating(true);

    try {
      const result = await calculateEmergyByFile(uploadedFile);

      setCalculationResult(result);
      toast.success("Cálculo concluído com sucesso!", {
        description: "Os resultados estão disponíveis abaixo.",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50/20">
      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-green-900">
              Cálculo LCI por arquivo
            </h1>
            <p className="text-lg text-green-700">
              Importe seu arquivo CSV ou Excel para começar a análise
            </p>
          </div>

          <FileUpload onFileChange={handleFileChange} />

          {/* Botão de calcular - sempre visível */}
          <div className="mt-6 text-center">
            <Button
              onClick={handleCalculate}
              disabled={!uploadedFile || isCalculating}
              className="cursor-pointer bg-green-600 px-8 py-3 text-lg text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              size="lg"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-5 w-5" />
                  Processar Arquivo
                </>
              )}
            </Button>
          </div>

          {/* Exibição dos resultados */}
          {calculationResult && (
            <div className="mt-8">
              <ResultsDisplay result={calculationResult} />
            </div>
          )}

          {/* Instruções */}
          {!calculationResult && (
            <Card className="mt-8 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">
                  Instruções
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>
                      Aceitos apenas arquivos nos formatos <strong>.csv</strong>
                      , <strong>.xls</strong> ou <strong>.xlsx</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>
                      O arquivo deve conter todos os dados do inventário do
                      ciclo de vida
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Tamanho máximo do arquivo: 10MB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>
                      Após carregar o arquivo, clique em "Processar Arquivo"
                      para iniciar o cálculo
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

export default CalculateEmergyByFile;
