import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";

const BuildingData = ({ formData, handleInputChange, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">3. Gebäudedaten</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie die wichtigsten Informationen zu Ihrem Gebäude an.
      </p>

      <div className="space-y-2">
        <Label htmlFor="constructionYear">Baujahr</Label>
        <p className="text-sm text-gray-500">In welchem Jahr wurde das Gebäude errichtet?</p>
        <Input
          id="constructionYear"
          name="constructionYear"
          type="number"
          value={formData.constructionYear}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="livingArea">Wohnfläche (m²)</Label>
        <p className="text-sm text-gray-500">Wie groß ist die beheizte Wohnfläche?</p>
        <Input
          id="livingArea"
          name="livingArea"
          type="number"
          value={formData.livingArea}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Dachgeschoss gedämmt?</Label>
        <p className="text-sm text-gray-500">Wie ist der Dämmzustand des Dachgeschosses?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('roofInsulated', value)}
          value={formData.roofInsulated}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsaniert" id="roofInsulated-unsaniert" />
            <Label htmlFor="roofInsulated-unsaniert">Unsaniert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teilsaniert" id="roofInsulated-teilsaniert" />
            <Label htmlFor="roofInsulated-teilsaniert">Teilsaniert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="saniert" id="roofInsulated-saniert" />
            <Label htmlFor="roofInsulated-saniert">Saniert</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Fenster gedämmt?</Label>
        <p className="text-sm text-gray-500">Wie ist der Dämmzustand der Fenster?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('windowsInsulated', value)}
          value={formData.windowsInsulated}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsaniert" id="windowsInsulated-unsaniert" />
            <Label htmlFor="windowsInsulated-unsaniert">Unsaniert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teilsaniert" id="windowsInsulated-teilsaniert" />
            <Label htmlFor="windowsInsulated-teilsaniert">Teilsaniert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="saniert" id="windowsInsulated-saniert" />
            <Label htmlFor="windowsInsulated-saniert">Saniert</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Fassade gedämmt?</Label>
        <p className="text-sm text-gray-500">Wie ist der Dämmzustand der Fassade?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('facadeInsulated', value)}
          value={formData.facadeInsulated}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsaniert" id="facadeInsulated-unsaniert" />
            <Label htmlFor="facadeInsulated-unsaniert">Unsaniert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teilsaniert" id="facadeInsulated-teilsaniert" />
            <Label htmlFor="facadeInsulated-teilsaniert">Teilsaniert</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="saniert" id="facadeInsulated-saniert" />
            <Label htmlFor="facadeInsulated-saniert">Saniert</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default BuildingData;