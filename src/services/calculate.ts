import { AxiosResponse } from "axios";
import { CalculationResult } from "@/types/calculate";
import api from "@/services/api";

export async function calculateEmergyByFile(
  file: File,
): Promise<CalculationResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response: AxiosResponse<CalculationResult> = await api.post(
    "/calculate/by-file",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return {
    ...response.data,
    filename: file.name,
  };
}
