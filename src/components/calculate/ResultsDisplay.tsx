import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Leaf, BarChart3, CheckCircle } from "lucide-react";
import { CalculationResult } from "@/types/calculate";

interface ResultsDisplayProps {
  result: CalculationResult;
}

const classificationMap: Record<string, { label: string; className: string }> =
  {
    HIGHLY_SUSTAINABLE: {
      label: "Altamente Sustentável",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    SUSTAINABLE: {
      label: "Sustentável",
      className: "bg-lime-100 text-lime-800 border-lime-200",
    },
    LOW_SUSTAINABILITY: {
      label: "Pouco Sustentável",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    UNSUSTAINABLE: {
      label: "Insustentável",
      className: "bg-red-100 text-red-800 border-red-200",
    },
    DEFAULT: {
      label: "Desconhecido",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const classificationKey = result.sustainability.classification.toUpperCase();

  const { label, className } =
    classificationMap[classificationKey] || classificationMap.DEFAULT;

  const formatValue = (value: string) => {
    // Converter notação científica para formato mais legível
    const num = parseFloat(value);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toString();
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header com nome do arquivo */}
      <Card className="border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl text-green-800">
            <FileText className="h-5 w-5" />
            Resultados do Cálculo
          </CardTitle>
          <p className="text-sm text-green-600">
            Arquivo: <span className="font-medium">{result.filename}</span>
          </p>
        </CardHeader>
      </Card>

      {/* Resultado principal */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-green-800">
              <Leaf className="h-5 w-5" />
              Emergia Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-900">
                {formatValue(result.emergy.Total.value)}
              </div>
              <div className="mt-1 text-sm text-green-600">
                {result.emergy.Total.unit}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-green-800">
              <CheckCircle className="h-5 w-5" />
              Classificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Badge
                className={`px-4 py-2 text-lg ${className}`}
                variant="outline"
              >
                {label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores detalhados */}
      <Card className="border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-green-800">
            <BarChart3 className="h-5 w-5" />
            Indicadores de Sustentabilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-2xl font-bold text-green-900">
                {result.sustainability.EYR}
              </div>
              <div className="text-sm font-medium text-green-600">
                EYR (Emergia Yield Ratio)
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-2xl font-bold text-green-900">
                {result.sustainability.ELR}
              </div>
              <div className="text-sm font-medium text-green-600">
                ELR (Environmental Loading Ratio)
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="text-2xl font-bold text-green-900">
                {result.sustainability.ESI}
              </div>
              <div className="text-sm font-medium text-green-600">
                ESI (Emergy Sustainability Index)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes da emergia */}
      <Card className="border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-800">
            Detalhamento da Emergia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col space-y-2 rounded bg-blue-50 p-4">
              <span className="font-medium text-blue-900">
                Recursos Não Renováveis (F)
              </span>
              <span className="text-lg font-semibold text-blue-800">
                {formatValue(result.emergy.F.value)} {result.emergy.F.unit}
              </span>
            </div>

            <div className="flex flex-col space-y-2 rounded bg-orange-50 p-3">
              <span className="font-medium text-orange-900">
                Recursos Naturais (N)
              </span>
              <span className="text-lg font-semibold text-orange-800">
                {formatValue(result.emergy.N.value)} {result.emergy.N.unit}
              </span>
            </div>

            <div className="flex flex-col space-y-2 rounded bg-green-50 p-3">
              <span className="font-medium text-green-900">
                Recursos Renováveis (R)
              </span>
              <span className="text-lg font-semibold text-green-800">
                {formatValue(result.emergy.R.value)} {result.emergy.R.unit}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
