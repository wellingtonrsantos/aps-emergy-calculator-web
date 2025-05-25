import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Calculator,
  FileText,
  Package2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50/20">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="mx-auto max-w-4xl">
          {/* Título principal */}
          <div className="animate-fade-in mb-12 text-center">
            <h1 className="mb-6 text-4xl font-bold text-green-900 md:text-5xl">
              Bem-vindo ao Sistema de Cálculo de Emergia
            </h1>

            {/* Texto introdutório */}
            <div className="mx-auto mb-8 max-w-3xl">
              <p className="mb-6 text-lg leading-relaxed text-green-700 md:text-xl">
                O sistema permite realizar cálculos de <strong>emergia</strong>{" "}
                — uma metodologia utilizada para avaliar o consumo de energia
                incorporada nos produtos, serviços e processos.
              </p>
              <p className="text-lg text-green-600">
                Você pode escolher entre duas formas de calcular:
              </p>
            </div>
          </div>

          {/* Opções de cálculo */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Cálculo com Arquivo */}
            <Card className="animate-fade-in flex h-full flex-col border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 p-4">
                  <FileText className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="mb-2 text-xl text-green-800">
                  Cálculo com Arquivo
                </CardTitle>
                <p className="text-sm text-green-600">
                  Envie sua própria base de dados (CSV/Excel)
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between text-center">
                <p className="mb-6 leading-relaxed text-gray-600">
                  Faça upload do seu arquivo com dados de consumo energético e
                  obtenha análises detalhadas de sustentabilidade.
                </p>
                <Link to="/calculate-by-file">
                  <Button
                    size="lg"
                    className="w-full cursor-pointer bg-blue-600 py-3 text-lg font-medium text-white hover:bg-blue-700"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Realizar cálculo com arquivo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Cálculo com Base LCI */}
            <Card className="animate-fade-in flex h-full flex-col border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 p-4">
                  <Package2 className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="mb-2 text-xl text-green-800">
                  Cálculo com nossa Base LCI
                </CardTitle>
                <p className="text-sm text-green-600">
                  Utilize nossa base de dados integrada e atualizada
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between text-center">
                <p className="mb-6 leading-relaxed text-gray-600">
                  Acesse inventários pré-configurados de produtos e serviços
                  para análises rápidas e precisas.
                </p>
                <Link to="/calculate-by-lci">
                  <Button
                    size="lg"
                    className="w-full cursor-pointer bg-green-600 py-3 text-lg font-medium text-white hover:bg-green-700"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Realizar cálculo com base LCI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Informações sobre Emergia */}
          <Card className="animate-fade-in border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-green-800">
                <Calculator className="h-6 w-6" />O que é Emergia?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold text-green-700">
                    Conceito
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    A emergia quantifica toda a energia solar equivalente que
                    foi direta ou indiretamente necessária para produzir um
                    produto ou serviço.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold text-green-700">
                    Aplicação
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    Permite avaliar a sustentabilidade ambiental e a eficiência
                    energética de processos produtivos e sistemas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
