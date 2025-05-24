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
  filename: string;
  emergy: EmergyData;
  sustainability: SustainabilityData;
}
