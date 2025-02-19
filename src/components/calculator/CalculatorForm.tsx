import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CalculatorInputs } from "@/types/calculator";

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (inputs: CalculatorInputs) => void;
  onCalculate: () => void;
}

const CalculatorForm = ({ inputs, onInputChange, onCalculate }: CalculatorFormProps) => {
  const handleNumericInput = (
    value: string,
    field: keyof Pick<CalculatorInputs, "totalCost" | "heatingAge" | "yearlyIncome" | "units">
  ) => {
    const numericValue = value === "" ? 0 : parseFloat(value);
    onInputChange({ ...inputs, [field]: numericValue });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Gebäudetyp</Label>
        <RadioGroup
          value={inputs.buildingType}
          onValueChange={(value: "EFH" | "MFH") =>
            onInputChange({ ...inputs, buildingType: value, units: value === "EFH" ? 1 : 2 })
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="EFH" id="EFH" />
            <Label htmlFor="EFH">Einfamilienhaus</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MFH" id="MFH" />
            <Label htmlFor="MFH">Mehrfamilienhaus</Label>
          </div>
        </RadioGroup>
      </div>

      {inputs.buildingType === "MFH" && (
        <div className="space-y-2">
          <Label htmlFor="units">Anzahl Wohneinheiten</Label>
          <Input
            id="units"
            type="number"
            inputMode="numeric"
            min={2}
            value={inputs.units === 0 ? "" : inputs.units}
            onChange={(e) => handleNumericInput(e.target.value, "units")}
            className="text-right"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="totalCost">Gesamtinvestitionskosten (€)</Label>
        <Input
          id="totalCost"
          type="number"
          inputMode="numeric"
          min={0}
          value={inputs.totalCost === 0 ? "" : inputs.totalCost}
          onChange={(e) => handleNumericInput(e.target.value, "totalCost")}
          className="text-left"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="heatingAge">Alter der Heizungsanlage (Jahre)</Label>
        <Input
          id="heatingAge"
          type="number"
          inputMode="numeric"
          min={0}
          value={inputs.heatingAge === 0 ? "" : inputs.heatingAge}
          onChange={(e) => handleNumericInput(e.target.value, "heatingAge")}
          className="text-left"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearlyIncome">Haushaltsjahreseinkommen (€)</Label>
        <Input
          id="yearlyIncome"
          type="number"
          inputMode="numeric"
          min={0}
          value={inputs.yearlyIncome === 0 ? "" : inputs.yearlyIncome}
          onChange={(e) => handleNumericInput(e.target.value, "yearlyIncome")}
          className="text-left"
        />
      </div>

      <div className="space-y-4">
        <Label>Selbstnutzung</Label>
        <RadioGroup
          value={inputs.selfUsed ? "yes" : "no"}
          onValueChange={(value) =>
            onInputChange({ ...inputs, selfUsed: value === "yes" })
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="selfUsedYes" />
            <Label htmlFor="selfUsedYes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="selfUsedNo" />
            <Label htmlFor="selfUsedNo">Nein</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        className="w-full"
        onClick={onCalculate}
      >
        Förderung berechnen
      </Button>
    </div>
  );
};

export default CalculatorForm;