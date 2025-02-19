import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";

const OwnershipAndFunding = ({ formData, handleInputChange, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">11. Eigentum & Förderung</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie Informationen zum Eigentum und möglicher Förderung an.
      </p>

      <div className="space-y-2">
        <Label>Sind Sie Eigentümer?</Label>
        <p className="text-sm text-gray-500">Sind Sie Eigentümer der Immobilie?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('isOwner', value)}
          value={formData.isOwner}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="isOwner-yes" />
            <Label htmlFor="isOwner-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="isOwner-no" />
            <Label htmlFor="isOwner-no">Nein</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="buildingPermitDate">Datum Baugenehmigung</Label>
        <p className="text-sm text-gray-500">Wann wurde die Baugenehmigung erteilt?</p>
        <Input
          id="buildingPermitDate"
          name="buildingPermitDate"
          type="date"
          value={formData.buildingPermitDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fundableUnits">Förderfähige Wohneinheiten</Label>
        <p className="text-sm text-gray-500">Wie viele förderfähige Wohneinheiten gibt es?</p>
        <Input
          id="fundableUnits"
          name="fundableUnits"
          type="number"
          value={formData.fundableUnits}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fundableArea">Förderfähige Fläche (m²)</Label>
        <p className="text-sm text-gray-500">Wie groß ist die förderfähige Fläche?</p>
        <Input
          id="fundableArea"
          name="fundableArea"
          type="number"
          value={formData.fundableArea}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalCosts">Zusatzkosten</Label>
        <p className="text-sm text-gray-500">Gibt es erwartete Zusatzkosten?</p>
        <Input
          id="additionalCosts"
          name="additionalCosts"
          value={formData.additionalCosts}
          onChange={handleInputChange}
          placeholder="z.B. Umbauarbeiten, Entsorgung"
        />
      </div>
    </div>
  );
};

export default OwnershipAndFunding;