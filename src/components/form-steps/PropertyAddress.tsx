import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormStepProps } from "@/types/heatPumpForm";

const PropertyAddress = ({ formData, handleInputChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">2. Objektadresse</h2>
      <p className="text-gray-600 mb-4">
        Wo befindet sich das Gebäude, in dem die Wärmepumpe installiert werden soll? 
        Dies kann von Ihrem Wohnort abweichen.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="street">Straße</Label>
          <p className="text-sm text-gray-500">In welcher Straße befindet sich das Objekt?</p>
          <Input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="houseNumber">Hausnummer</Label>
          <p className="text-sm text-gray-500">Welche Hausnummer hat das Objekt?</p>
          <Input
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="propertyPostalCode">PLZ</Label>
          <p className="text-sm text-gray-500">Wie lautet die Postleitzahl des Objekts?</p>
          <Input
            id="propertyPostalCode"
            name="propertyPostalCode"
            value={formData.propertyPostalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">Ort</Label>
          <p className="text-sm text-gray-500">In welchem Ort befindet sich das Objekt?</p>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyAddress;