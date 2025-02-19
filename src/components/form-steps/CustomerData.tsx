import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormStepProps } from "@/types/heatPumpForm";

const CustomerData = ({ formData, handleInputChange }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">1. Kundendaten</h2>
      <p className="text-gray-600 mb-4">
        Fragen Sie den Kunden nach seinen persönlichen Daten. Diese benötigen wir für die spätere Kontaktaufnahme und Angebotserstellung.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Vorname</Label>
          <p className="text-sm text-gray-500">Wie lautet Ihr Vorname?</p>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nachname</Label>
          <p className="text-sm text-gray-500">Wie lautet Ihr Nachname?</p>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">PLZ</Label>
        <p className="text-sm text-gray-500">Wie lautet die Postleitzahl Ihres Wohnorts?</p>
        <Input
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">Geburtsdatum (optional)</Label>
        <p className="text-sm text-gray-500">Wann wurden Sie geboren? Dies hilft uns bei der Identifikation für Fördermittel.</p>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="internalId">Interne ID (optional)</Label>
        <p className="text-sm text-gray-500">Falls vorhanden, geben Sie bitte Ihre interne ID an.</p>
        <Input
          id="internalId"
          name="internalId"
          value={formData.internalId}
          onChange={handleInputChange}
          placeholder="z.B. Bitrix-ID"
        />
      </div>
    </div>
  );
};

export default CustomerData;