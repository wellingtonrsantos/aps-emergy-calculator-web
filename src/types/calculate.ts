export interface EmergyValue {
  value: string;
  unit: string;
}

export interface EmergyData {
  F: EmergyValue;
  N: EmergyValue;
  R: EmergyValue;
  Total: EmergyValue;
}

export interface SustainabilityData {
  EYR: number;
  ELR: number;
  ESI: number;
  classification: string;
}

export interface CalculationResult {
  filename?: string;
  product_id?: string;
  product_name?: string;
  emergy: EmergyData;
  sustainability: SustainabilityData;
}
