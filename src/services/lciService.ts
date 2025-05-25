import api from "@/services/api";
import { LCIProduct } from "@/types/lci";

export const lciService = {
  getProducts: async (): Promise<LCIProduct[]> => {
    const response = await api.get("/lci/products");
    return response.data;
  },
};
