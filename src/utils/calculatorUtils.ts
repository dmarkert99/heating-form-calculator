import { CalculatorInputs, CalculationResult } from "../types/calculator";

export const calculateMaxEligibleAmount = (type: "EFH" | "MFH", units: number) => {
  if (type === "EFH") return 30000;
  
  let amount = 30000; // First unit
  const remainingUnits = units - 1;
  
  if (remainingUnits <= 5) {
    amount += remainingUnits * 15000;
  } else {
    amount += 5 * 15000; // First 5 additional units
    amount += (remainingUnits - 5) * 8000; // Remaining units
  }
  
  return amount;
};

export const calculateFunding = (inputs: CalculatorInputs): CalculationResult => {
  // Base calculations
  let baseRate = 30;
  let efficiencyBonus = 5; // Always 5%
  let speedBonus = 0;
  let incomeBonus = 0;

  // For MFH without self-usage, cap at 35%
  if (inputs.buildingType === "MFH" && !inputs.selfUsed) {
    // Set base rate to 30% and efficiency bonus to 5%, ignore all other bonuses
    baseRate = 30;
    efficiencyBonus = 5;
    speedBonus = 0;
    incomeBonus = 0;
  } else {
    // Normal calculation for EFH or self-used MFH
    // Speed bonus calculation (20%)
    if (inputs.heatingAge > 20 && inputs.selfUsed) {
      speedBonus = 20;
    }

    // Income bonus calculation (30%)
    if (inputs.yearlyIncome < 40000 && inputs.selfUsed) {
      incomeBonus = 30;
    }
  }

  // Calculate total rate (capped at 70% for self-used, 35% for non-self-used MFH)
  const maxRate = (inputs.buildingType === "MFH" && !inputs.selfUsed) ? 35 : 70;
  let totalRate = Math.min(baseRate + efficiencyBonus + speedBonus + incomeBonus, maxRate);

  // Calculate eligible amount
  const maxEligibleAmount = calculateMaxEligibleAmount(inputs.buildingType, inputs.units);
  const eligibleAmount = Math.min(inputs.totalCost, maxEligibleAmount);

  // Calculate final funding amount
  const finalAmount = (eligibleAmount * totalRate) / 100;

  return {
    baseRate,
    efficiencyBonus,
    speedBonus,
    incomeBonus,
    totalRate,
    maxEligibleAmount,
    finalAmount,
  };
};