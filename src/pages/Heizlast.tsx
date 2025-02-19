
import HeatingForm from "@/components/HeatingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Home, ThermometerSnowflake } from "lucide-react";

const Heizlast = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ThermometerSnowflake className="h-8 w-8 text-primary" />
          Heizlastberechnung
        </h1>
        <p className="text-gray-600 mt-2">
          Berechnen Sie die Heizlast Ihres Wohngebäudes
        </p>
      </header>

      <div className="grid md:grid-cols-1 gap-6">

        <HeatingForm />
      </div>
    </div>
  );
};

export default Heizlast;
