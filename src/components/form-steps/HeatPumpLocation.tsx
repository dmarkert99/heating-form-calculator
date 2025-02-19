import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStepProps } from "@/types/heatPumpForm";

const HeatPumpLocation = ({ formData, handleInputChange, handleRadioChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">9. Wärmepumpen-Aufstellort</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie Informationen zum geplanten Aufstellort der Wärmepumpe an.
      </p>

      <div className="space-y-2">
        <Label htmlFor="distanceToHeatingRoom">Entfernung zum Heizraum (m)</Label>
        <p className="text-sm text-gray-500">Wie weit ist der geplante Aufstellort vom Heizraum entfernt?</p>
        <Input
          id="distanceToHeatingRoom"
          name="distanceToHeatingRoom"
          type="number"
          value={formData.distanceToHeatingRoom}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Art der Aufstellung</Label>
        <p className="text-sm text-gray-500">Wie soll die Wärmepumpe aufgestellt werden?</p>
        <RadioGroup
          value={formData.installationType}
          onValueChange={(value) => handleRadioChange('installationType', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wall" id="wall" />
            <Label htmlFor="wall">Direkt an der Hauswand</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="freestanding" id="freestanding" />
            <Label htmlFor="freestanding">Frei auf dem Grundstück platziert</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Bodenbeschaffenheit</Label>
        <p className="text-sm text-gray-500">Welche Bodenbeschaffenheit liegt am Aufstellort vor?</p>
        <RadioGroup
          value={formData.groundMaterial}
          onValueChange={(value) => handleRadioChange('groundMaterial', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="soil" id="soil" />
            <Label htmlFor="soil">Erde</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pavement" id="pavement" />
            <Label htmlFor="pavement">Pflasterstein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concrete" id="concrete" />
            <Label htmlFor="concrete">Beton</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gravel" id="gravel" />
            <Label htmlFor="gravel">Kies/Schotter</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="distanceToBuilding">Abstand zum Gebäude (m)</Label>
        <p className="text-sm text-gray-500">Wie weit soll die Wärmepumpe vom Gebäude entfernt sein?</p>
        <Input
          id="distanceToBuilding"
          name="distanceToBuilding"
          type="number"
          value={formData.distanceToBuilding}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="narrowestPassage">Engste Durchgangsbreite (cm)</Label>
        <p className="text-sm text-gray-500">Wie breit ist der engste Durchgang zum Aufstellort?</p>
        <Input
          id="narrowestPassage"
          name="narrowestPassage"
          type="number"
          value={formData.narrowestPassage}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="heatingRoomHeight">Höhe Heizraum (m)</Label>
        <p className="text-sm text-gray-500">Wie hoch ist der Heizraum?</p>
        <Input
          id="heatingRoomHeight"
          name="heatingRoomHeight"
          type="number"
          value={formData.heatingRoomHeight}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default HeatPumpLocation;