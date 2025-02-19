import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormStepProps } from "@/types/heatPumpForm";

const HeatingCircuits = ({ formData, handleInputChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">7. Heizkreise</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie die Anzahl Ihrer Heizkreise an.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mixedCircuits">Gemischte Heizkreise (Fußbodenheizung)</Label>
          <p className="text-sm text-gray-500">Anzahl der gemischten Heizkreise (0-3)</p>
          <Input
            id="mixedCircuits"
            name="mixedCircuits"
            type="number"
            min="0"
            max="3"
            value={formData.mixedCircuits}
            onChange={handleInputChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unmixedCircuits">Ungemischte Heizkreise (Heizkörper)</Label>
          <p className="text-sm text-gray-500">Anzahl der ungemischten Heizkreise (0-3)</p>
          <Input
            id="unmixedCircuits"
            name="unmixedCircuits"
            type="number"
            min="0"
            max="3"
            value={formData.unmixedCircuits}
            onChange={handleInputChange}
            required
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeatingCircuits;