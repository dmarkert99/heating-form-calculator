import React from "react";
import { CalculationResult } from "@/types/calculator";
import { cn } from "@/lib/utils";

interface CalculatorResultsProps {
  result: CalculationResult | null;
}

const CalculatorResults = ({ result }: CalculatorResultsProps) => {
  if (!result) {
    return (
      <div className="text-center text-kfw-text-light py-8">
        Bitte füllen Sie das Formular aus und klicken Sie auf "Förderung berechnen"
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-kfw-text">Fördersatz</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Grundförderung:</div>
          <div className="text-right">{result.baseRate}%</div>
          <div>Effizienzbonus:</div>
          <div className="text-right">{result.efficiencyBonus}%</div>
          {result.speedBonus > 0 && (
            <>
              <div>Klimageschwindigkeitsbonus:</div>
              <div className="text-right">{result.speedBonus}%</div>
            </>
          )}
          {result.incomeBonus > 0 && (
            <>
              <div>Einkommensbonus:</div>
              <div className="text-right">{result.incomeBonus}%</div>
            </>
          )}
          <div className="font-medium border-t pt-2">Gesamtfördersatz:</div>
          <div className="font-medium border-t pt-2 text-right">
            {result.totalRate}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-kfw-text">Förderbeträge</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Maximale förderfähige Kosten:</div>
          <div className="text-right">
            {result.maxEligibleAmount.toLocaleString("de-DE")} €
          </div>
          <div className="font-medium border-t pt-2">Förderbetrag:</div>
          <div className="font-medium border-t pt-2 text-right">
            {Math.round(result.finalAmount).toLocaleString("de-DE")} €
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResults;