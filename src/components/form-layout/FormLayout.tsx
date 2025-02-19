import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface FormLayoutProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitted?: boolean;
  onReset?: () => void;
}

const FormLayout = ({ children, onSubmit, isSubmitted, onReset }: FormLayoutProps) => {
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Vielen Dank für Ihre Anfrage!
          </h2>
          <p className="text-gray-600">
            Wir haben Ihre Informationen erhalten und werden uns in Kürze bei Ihnen melden.
          </p>
        </div>
        <Button 
          onClick={onReset}
          className="mt-8"
        >
          Neue Anfrage starten
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      {children}
      <Button 
        type="submit"
        className="w-full"
      >
        Absenden
      </Button>
    </form>
  );
};

export default FormLayout;