import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/calculate/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { lciService } from "@/services/lciService";
import { LCIProduct } from "@/types/lci";
import ResultsDisplay from "@/components/calculate/ResultsDisplay";
import { toast } from "sonner";
import { CalculationResult } from "@/types/calculate";
import { calculateEmergyByLciId } from "@/services/calculate";
import { useAxiosErrorHandler } from "@/hooks/useAxiosErrorHandler";

const CalculateEmergyByLCI = () => {
  const [products, setProducts] = useState<LCIProduct[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);
  const [calculatingProductId, setCalculatingProductId] = useState<
    string | null
  >(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleError = useAxiosErrorHandler();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await lciService.getProducts();
        setProducts(data);
      } catch (err) {
        setError("Erro ao carregar produtos. Tente novamente.");
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = async (id: string) => {
    setIsCalculating(true);
    setCalculatingProductId(id);
    try {
      const result = await calculateEmergyByLciId(id);

      // Enriquecer com o nome do produto (opcional)
      const product = products.find((p) => p.id === id);
      const enrichedResult = {
        ...result,
        product_id: id,
        product_name: product?.name || "Produto não encontrado",
      };

      setCalculationResult(enrichedResult);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      toast.success("Cálculo LCI concluído com sucesso!", {
        description: "Os resultados estão disponíveis abaixo.",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsCalculating(false);
      setCalculatingProductId(null);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-green-50/20">
        <main className="container mx-auto px-4 pt-24 pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-3xl font-bold text-green-900">
                Cálculo LCI com base do sistema
              </h1>
              <p className="text-lg text-green-700">
                Selecione um produto ou serviço para iniciar a análise de
                inventário do ciclo de vida
              </p>
            </div>

            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-green-600" />
                <p className="mt-2 text-green-600">Carregando produtos...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-green-50/20">
        <main className="container mx-auto px-4 pt-24 pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-3xl font-bold text-green-900">
                Cálculo LCI com base do sistema
              </h1>
              <p className="text-lg text-green-700">
                Selecione um produto ou serviço para iniciar a análise de
                inventário do ciclo de vida
              </p>
            </div>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
                    <p className="mt-2 text-red-700">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50/20">
      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-green-900">
              Cálculo LCI com base do sistema
            </h1>
            <p className="text-lg text-green-700">
              Selecione um produto ou serviço para iniciar a análise de
              inventário do ciclo de vida
            </p>
          </div>

          {/* Barra de busca */}
          <Card className="mb-8 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                <Search className="h-5 w-5" />
                Buscar Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite para buscar produtos ou serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                isLoading={isCalculating && calculatingProductId === product.id}
              />
            ))}
          </div>

          {/* Exibição dos resultados do cálculo */}
          {calculationResult && (
            <div className="mt-8" ref={resultsRef}>
              <ResultsDisplay result={calculationResult} />
            </div>
          )}

          {/* Mensagem quando não há resultados */}
          {filteredProducts.length === 0 && searchTerm && (
            <div className="py-12 text-center">
              <p className="text-lg text-green-600">
                Nenhum produto encontrado para "{searchTerm}"
              </p>
              <p className="mt-2 text-sm text-green-500">
                Tente buscar com outros termos
              </p>
            </div>
          )}

          {/* Informações adicionais */}
          {!calculationResult && (
            <Card className="mt-8 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">
                  Sobre o LCI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>
                      <strong>LCI (Life Cycle Inventory)</strong> - Inventário
                      do Ciclo de Vida
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>
                      Quantifica entradas e saídas de um sistema de produto
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>
                      Inclui uso de recursos, emissões e resíduos gerados
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Base para avaliação de impactos ambientais</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalculateEmergyByLCI;
