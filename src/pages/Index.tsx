
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Construction, ThermometerSnowflake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/heizlast')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Heizlastberechnung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Berechnen Sie die Heizlast Ihres Wohngebäudes
            </p>
            <Button variant="outline" className="w-full">
              Zur Berechnung
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/kfw-rechner')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              KfW-Förderrechner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Berechnen Sie Ihre KfW-Förderung
            </p>
            <Button variant="outline" className="w-full">
              Zur Berechnung
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/placeholder')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-primary" />
              Weitere Funktionen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Dieser Bereich wird noch entwickelt
            </p>
            <Button variant="outline" className="w-full">
              Mehr erfahren
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
