import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormStepProps } from "@/types/heatPumpForm";

const FinalStep = ({ formData, handleInputChange, handleRadioChange, onBack }: FormStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">12. Abschluss</h2>
      <p className="text-gray-600 mb-4">
        Bitte geben Sie abschließend Ihre Kontaktdaten und Präferenzen an.
      </p>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Zusätzliche Informationen</Label>
        <p className="text-sm text-gray-500">Haben Sie weitere Anmerkungen oder Fragen?</p>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          placeholder="Ihre Anmerkungen..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">E-Mail</Label>
        <p className="text-sm text-gray-500">Ihre E-Mail-Adresse für Rückfragen</p>
        <Input
          id="contactEmail"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPhone">Telefon</Label>
        <p className="text-sm text-gray-500">Ihre Telefonnummer für Rückfragen</p>
        <Input
          id="contactPhone"
          name="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Bevorzugte Kontaktart</Label>
        <p className="text-sm text-gray-500">Wie möchten Sie kontaktiert werden?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('preferredContact', value)}
          value={formData.preferredContact}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email">E-Mail</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone">Telefon</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Art des Termins</Label>
        <p className="text-sm text-gray-500">Welche Art von Beratungstermin wünschen Sie?</p>
        <RadioGroup
          onValueChange={(value) => handleRadioChange('appointmentType', value)}
          value={formData.appointmentType}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onsite" id="appointment-onsite" />
            <Label htmlFor="appointment-onsite">Vor-Ort-Termin</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="appointment-video" />
            <Label htmlFor="appointment-video">Video-Beratung</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline"
          onClick={onBack}
        >
          Zurück
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;