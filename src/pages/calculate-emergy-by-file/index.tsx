import FileUpload from "@/components/calculate/FileUpload";
import ResultsDisplay from "@/components/calculate/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";
import { calculateEmergyByFile } from "@/services/calculate";
import { CalculationResult } from "@/types/calculate";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

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

          {/* Card de Instruções */}
          <Card className="mb-8 border-green-200 bg-green-50/30">
            <Collapsible
              open={isInstructionsOpen}
              onOpenChange={setIsInstructionsOpen}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer pb-4 transition-colors hover:bg-green-50/50">
                  <CardTitle className="flex items-center justify-between text-lg text-green-800">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5" />
                      Instruções para enviar o arquivo
                    </div>
                    {isInstructionsOpen ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {/* Formatos aceitos */}
                    <div className="flex items-start">
                      <span className="mt-2 mr-3 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                      <div>
                        <strong className="text-green-800">
                          Formatos aceitos:
                        </strong>
                        <span className="ml-1">.csv, .xls ou .xlsx</span>
                      </div>
                    </div>

                    {/* Colunas obrigatórias */}
                    <div className="flex items-start">
                      <span className="mt-2 mr-3 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                      <div>
                        <strong className="text-green-800">
                          Colunas obrigatórias que o arquivo deve conter:
                        </strong>
                        <div className="mt-2 space-y-1 pl-4 text-sm">
                          <div className="flex">
                            <span className="w-32 font-medium text-green-700">
                              Flow Name
                            </span>
                            <span className="text-gray-600">
                              – nome do fluxo
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 font-medium text-green-700">
                              Amount
                            </span>
                            <span className="text-gray-600">– quantidade</span>
                          </div>
                          <div className="flex">
                            <span className="w-32 font-medium text-green-700">
                              Unit
                            </span>
                            <span className="text-gray-600">
                              – unidade de medida
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 font-medium text-green-700">
                              Flow Direction
                            </span>
                            <span className="text-gray-600">
                              – entrada ou saída
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 font-medium text-green-700">
                              UEV
                            </span>
                            <span className="text-gray-600">
                              – valor emergético unitário
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 font-medium text-green-700">
                              Category
                            </span>
                            <span className="text-gray-600">
                              – tipo do recurso (R, N ou F)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instrução final */}
                    <div className="flex items-start">
                      <span className="mt-2 mr-3 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                      <span>
                        <strong className="text-green-800">
                          Após carregar o arquivo corretamente
                        </strong>
                        , clique no botão "Processar Arquivo" para iniciar o
                        cálculo de emergia
                      </span>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          <FileUpload onFileChange={handleFileChange} />

          {/* Botão de calcular */}
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
            <div className="mt-8" ref={resultsRef}>
              <ResultsDisplay result={calculationResult} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CalculateEmergyByFile;
