import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CalculatorInputs, CalculationResult } from "@/types/calculator";
import { calculateFunding } from "@/utils/calculatorUtils";
import CalculatorForm from "./calculator/CalculatorForm";
import CalculatorResults from "./calculator/CalculatorResults";

const KfwCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    buildingType: "EFH",
    units: 1,
    totalCost: 0,
    heatingAge: 0,
    yearlyIncome: 0,
    selfUsed: true,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    try {
      const calculationResult = calculateFunding(inputs);
      setResult(calculationResult);

      toast({
        title: "Berechnung erfolgreich",
        description: "Die Förderung wurde erfolgreich berechnet.",
      });
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        variant: "destructive",
        title: "Fehler bei der Berechnung",
        description: "Bitte überprüfen Sie Ihre Eingaben.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-kfw-primary mb-8 text-center">
        KfW-Förderrechner (Programm 458)
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-kfw-text">Eingabedaten</h2>
          <CalculatorForm
            inputs={inputs}
            onInputChange={setInputs}
            onCalculate={handleCalculate}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-kfw-text">Ergebnis</h2>
          <CalculatorResults result={result} />
        </Card>
      </div>
    </div>
  );
};

export default KfwCalculator;