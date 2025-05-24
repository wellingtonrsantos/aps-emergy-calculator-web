import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer border-green-200 transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800 transition-colors group-hover:text-green-900">
            {product.name}
          </CardTitle>
          <Calculator className="h-5 w-5 text-green-600 transition-colors group-hover:text-green-700" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-green-700">
          {product.description ||
            "Produto disponível para cálculo de impacto ambiental"}
        </p>
        <Button
          onClick={() => onClick(product.id)}
          className="w-full bg-green-600 text-white hover:bg-green-700"
          size="sm"
        >
          Calcular LCI
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
