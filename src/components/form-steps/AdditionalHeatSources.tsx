import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";

const AdditionalHeatSources = ({ formData, handleInputChange, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">6. Weitere Wärmequellen</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie an, ob Sie weitere Wärmequellen nutzen oder planen.
      </p>

      <div className="space-y-2">
        <Label>Zusätzliche Wärmequelle vorhanden?</Label>
        <p className="text-sm text-gray-500">Haben Sie eine zusätzliche Wärmequelle?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('additionalHeatSource', value)}
          value={formData.additionalHeatSource}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="additionalHeatSource-yes" />
            <Label htmlFor="additionalHeatSource-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="additionalHeatSource-no" />
            <Label htmlFor="additionalHeatSource-no">Nein</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.additionalHeatSource === 'yes' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="additionalHeatSourceType">Art der Wärmequelle</Label>
            <p className="text-sm text-gray-500">Welche zusätzliche Wärmequelle nutzen Sie?</p>
            <Input
              id="additionalHeatSourceType"
              name="additionalHeatSourceType"
              value={formData.additionalHeatSourceType}
              onChange={handleInputChange}
              placeholder="z.B. Kamin, Solarthermie"
            />
          </div>

          <div className="space-y-2">
            <Label>Unterstützung für</Label>
            <p className="text-sm text-gray-500">Wofür wird die zusätzliche Wärmequelle genutzt?</p>
            <RadioGroup
              onValueChange={(value) => handleRadioChange('additionalHeatSourceSupport', value)}
              value={formData.additionalHeatSourceSupport}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="water" id="support-water" />
                <Label htmlFor="support-water">Warmwasser</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="heating" id="support-heating" />
                <Label htmlFor="support-heating">Heizung</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="support-both" />
                <Label htmlFor="support-both">Beides</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default AdditionalHeatSources;