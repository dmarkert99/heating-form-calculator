import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";

const ElectricityTariff = ({ formData, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">10. Stromtarif</h2>
      <p className="text-gray-600 mb-4">
        Bitte wählen Sie Ihren bevorzugten Stromtarif aus.
      </p>

      <div className="space-y-2">
        <Label>Tarifmodul</Label>
        <p className="text-sm text-gray-500">Welches Tarifmodul möchten Sie nutzen?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('tariffModule', value)}
          value={formData.tariffModule}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="module1" id="tariff-module1" />
            <Label htmlFor="tariff-module1">Basis-Tarif</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="module2" id="tariff-module2" />
            <Label htmlFor="tariff-module2">Komfort-Tarif</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="module3" id="tariff-module3" />
            <Label htmlFor="tariff-module3">Premium-Tarif</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ElectricityTariff;