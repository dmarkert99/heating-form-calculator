import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeatingSystem = ({ formData, handleInputChange, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">5. Heizungsanlage</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie Informationen zu Ihrer bestehenden Heizungsanlage an.
      </p>

      <div className="space-y-2">
        <Label htmlFor="heatingLocation">Standort der Heizung</Label>
        <p className="text-sm text-gray-500">Wo befindet sich die Heizungsanlage?</p>
        <Select 
          value={formData.heatingLocation} 
          onValueChange={(value) => handleRadioChange('heatingLocation', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bitte wählen Sie den Standort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="keller">Keller</SelectItem>
            <SelectItem value="erdgeschoss">Erdgeschoss</SelectItem>
            <SelectItem value="1og">1. OG</SelectItem>
            <SelectItem value="2og">2. OG</SelectItem>
            <SelectItem value="dachgeschoss">Dachgeschoss</SelectItem>
            <SelectItem value="ausserhalb">Außerhalb des Gebäudes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="heatingInstallYear">Einbaujahr</Label>
        <p className="text-sm text-gray-500">Wann wurde die Heizung installiert?</p>
        <Input
          id="heatingInstallYear"
          name="heatingInstallYear"
          type="number"
          value={formData.heatingInstallYear}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Art des Kessels</Label>
        <p className="text-sm text-gray-500">Welche Art von Kessel haben Sie?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('boilerType', value)}
          value={formData.boilerType}
          className="space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="condensing" id="boilerType-condensing" />
              <Label htmlFor="boilerType-condensing">Brennwertkessel</Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              Ein moderner Heizkessel, der zusätzliche Wärme aus den Abgasen gewinnt. 
              Typisch für Installationen ab dem Jahr 2000, erkenntlich an einem 
              Kunststoffabgasrohr und Kondensatableitung.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lowTemp" id="boilerType-lowTemp" />
              <Label htmlFor="boilerType-lowTemp">Niedertemperaturkessel</Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              Ein älterer Kesseltyp, der mit niedrigeren Temperaturen arbeitet als 
              Standardkessel. Typisch für Installationen zwischen 1985 und 2000, 
              meist mit Metallabgasrohr.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="boilerType-standard" />
              <Label htmlFor="boilerType-standard">Standardkessel</Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              Ein konventioneller Heizkessel, meist vor 1985 installiert. 
              Arbeitet mit hohen Vorlauftemperaturen und hat einen 
              vergleichsweise niedrigen Wirkungsgrad.
            </p>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="heatingPower">Leistung (kW)</Label>
        <p className="text-sm text-gray-500">Wie hoch ist die Leistung Ihrer Heizung?</p>
        <Input
          id="heatingPower"
          name="heatingPower"
          type="number"
          value={formData.heatingPower}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fuelType">Brennstoffart</Label>
        <p className="text-sm text-gray-500">Welchen Brennstoff nutzen Sie?</p>
        <Select 
          value={formData.fuelType} 
          onValueChange={(value) => handleRadioChange('fuelType', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bitte wählen Sie einen Brennstoff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="erdgas">Erdgas</SelectItem>
            <SelectItem value="fluessiggas">Flüssiggas</SelectItem>
            <SelectItem value="heizoel">Heizöl</SelectItem>
            <SelectItem value="pellets">Pellets</SelectItem>
            <SelectItem value="scheitholz">Scheitholz</SelectItem>
            <SelectItem value="strom">Strom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HeatingSystem;