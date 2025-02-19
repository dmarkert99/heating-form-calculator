import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormStepProps } from "@/types/heatPumpForm";

const HeatingLoad = ({ formData, handleInputChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">4. Heizlast</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie Informationen zur Heizlast Ihres Gebäudes an.
      </p>

      <div className="space-y-2">
        <Label htmlFor="heatingLoad">Heizlast (kW)</Label>
        <p className="text-sm text-gray-500">Falls bekannt, wie hoch ist die berechnete Heizlast?</p>
        <Input
          id="heatingLoad"
          name="heatingLoad"
          type="number"
          value={formData.heatingLoad}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fuelConsumption">Brennstoffverbrauch pro Jahr</Label>
        <p className="text-sm text-gray-500">Wie hoch ist Ihr jährlicher Brennstoffverbrauch?</p>
        <Input
          id="fuelConsumption"
          name="fuelConsumption"
          value={formData.fuelConsumption}
          onChange={handleInputChange}
          placeholder="z.B. 2000 Liter Öl oder 2500 m³ Gas"
        />
      </div>
    </div>
  );
};

export default HeatingLoad;