import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";

const HouseholdWaterNeeds = ({ formData, handleInputChange, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">8. Warmwasserbedarf</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie Informationen zu Ihrem Warmwasserbedarf an.
      </p>

      <div className="space-y-2">
        <Label htmlFor="householdPersons">Anzahl Personen</Label>
        <p className="text-sm text-gray-500">Wie viele Personen leben im Haushalt?</p>
        <Input
          id="householdPersons"
          name="householdPersons"
          type="number"
          value={formData.householdPersons}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Art der Warmwasserbereitung</Label>
        <p className="text-sm text-gray-500">Wie wird das Warmwasser derzeit bereitet?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('waterHeatingType', value)}
          value={formData.waterHeatingType}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="central" id="waterHeating-central" />
            <Label htmlFor="waterHeating-central">Zentral (über Heizung)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="decentralized" id="waterHeating-decentralized" />
            <Label htmlFor="waterHeating-decentralized">Dezentral (Durchlauferhitzer)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="waterHeating-none" />
            <Label htmlFor="waterHeating-none">Keine</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="waterTankSize">Speichergröße (Liter)</Label>
        <p className="text-sm text-gray-500">Falls vorhanden, wie groß ist Ihr Warmwasserspeicher?</p>
        <Input
          id="waterTankSize"
          name="waterTankSize"
          type="number"
          value={formData.waterTankSize}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Komfortanspruch</Label>
        <p className="text-sm text-gray-500">Welche besonderen Anforderungen haben Sie?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('waterComfort', value)}
          value={formData.waterComfort}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="circulation" id="comfort-circulation" />
            <Label htmlFor="comfort-circulation">Zirkulation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rainShower" id="comfort-rainShower" />
            <Label htmlFor="comfort-rainShower">Regendusche</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="comfort-none" />
            <Label htmlFor="comfort-none">Keine besonderen Anforderungen</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default HouseholdWaterNeeds;