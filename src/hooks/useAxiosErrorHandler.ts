import { AxiosError } from "axios";
import { useCallback } from "react";
import { toast } from "sonner";

type FieldError = {
  type: string;
  loc: string[];
  msg: string;
  input?: unknown;
};

type APIErrorResponse = { detail: string } | { detail: FieldError[] };

export function useAxiosErrorHandler() {
  return useCallback((error: unknown) => {
    const err = error as AxiosError<APIErrorResponse>;
    const data = err.response?.data;

    if (!data) {
      toast.error("Erro inesperado", {
        description: "Tente novamente mais tarde.",
      });
      return;
    }

    if (typeof data.detail === "string") {
      toast.error("Erro", { description: data.detail });
      return;
    }

    if (Array.isArray(data.detail)) {
      const messages = data.detail
        .map((item) => item?.msg)
        .filter((msg): msg is string => typeof msg === "string");

      toast.error("Erro de validação", {
        description: messages.join("\n"),
      });
      return;
    }

    toast.error("Erro inesperado");
  }, []);
}
