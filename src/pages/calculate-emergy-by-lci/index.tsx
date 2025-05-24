import { useState } from "react";
import ProductCard from "@/components/calculate/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description?: string;
}

// Dados mockados simulando retorno da API
const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Energia Solar Fotovoltaica",
    description: "Análise de ciclo de vida para sistemas de energia solar",
  },
  {
    id: "prod-002",
    name: "Energia Eólica",
    description: "Cálculo de impacto ambiental de turbinas eólicas",
  },
  {
    id: "prod-003",
    name: "Biomassa",
    description: "Avaliação de sustentabilidade de energia de biomassa",
  },
  {
    id: "prod-004",
    name: "Energia Hidrelétrica",
    description: "LCI para usinas hidrelétricas de pequeno porte",
  },
  {
    id: "prod-005",
    name: "Gás Natural",
    description: "Análise de impacto de termelétricas a gás natural",
  },
  {
    id: "prod-006",
    name: "Carvão Mineral",
    description: "Avaliação ambiental de usinas termoelétricas a carvão",
  },
];

const CalculateEmergyByLCI = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductClick = (id: string) => {
    alert(`Produto selecionado: ${id}`);
  };

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              />
            ))}
          </div>

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
                    <strong>LCI (Life Cycle Inventory)</strong> - Inventário do
                    Ciclo de Vida
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
        </div>
      </main>
    </div>
  );
};

export default CalculateEmergyByLCI;
