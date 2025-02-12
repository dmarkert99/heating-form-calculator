
import { Card } from "@/components/ui/card";
import { BuildingData, CalculationResults } from "@/lib/heatingCalculations";

interface ResultsDisplayProps {
  results: CalculationResults;
  formData: BuildingData;
}

const ResultsDisplay = ({ results, formData }: ResultsDisplayProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ergebnisse</h2>

      <div className="space-y-4">
        <Card className="p-4 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-2">Gesamte Heizlast</h3>
          <p className="text-3xl font-bold text-gray-900">
            {results.totalHeatingLoad.toFixed(2)} kW
          </p>
        </Card>

        <Card className="p-4 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-2">Personenzuschlag</h3>
          <p className="text-3xl font-bold text-gray-900">
            {results.occupantsSupplement.toFixed(2)} kW
          </p>
          <p className="text-sm text-gray-500 mt-1">
            (300W pro Person)
          </p>
        </Card>

        <Card className="p-4 bg-white/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-2">Detaillierte Berechnung</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Spezifische Heizlast:</span>
              <span className="font-medium">
                {results.specificHeatingLoad.toFixed(2)} W/m²
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wohnfläche:</span>
              <span className="font-medium">{formData.livingSpace} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grundheizlast:</span>
              <span className="font-medium">
                {results.baseHeatingLoad.toFixed(2)} kW
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
