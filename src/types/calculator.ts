export interface CalculatorInputs {
  buildingType: "EFH" | "MFH";
  units: number;
  totalCost: number;
  heatingAge: number;
  yearlyIncome: number;
  selfUsed: boolean;
}

export interface CalculationResult {
  baseRate: number;
  efficiencyBonus: number;
  speedBonus: number;
  incomeBonus: number;
  totalRate: number;
  maxEligibleAmount: number;
  finalAmount: number;
}