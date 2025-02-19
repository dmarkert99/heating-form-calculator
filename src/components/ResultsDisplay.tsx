
import { Card } from "@/components/ui/card";
import { BuildingData, CalculationResults } from "@/lib/heatingCalculations";
import { HeatingLoadChart } from "./HeatingLoadChart";

export interface ResultsDisplayProps {
  results: CalculationResults;
  formData: BuildingData;
  climateData: {
    design_temperature: number;
    average_temperature: number;
  }
}

const ResultsDisplay = ({ results, formData, climateData }: ResultsDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Maximale Heizlast</p>
          <p className="text-2xl font-bold text-primary">
            {`${Math.round(results.baseHeatingLoad * 100) / 100} kW`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {`${Math.round(results.specificHeatingLoad * 100) / 100} W/m²`}
          </p>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Personenzuschlag</p>
          <p className="text-2xl font-bold text-primary">
            {`${results.occupantsSupplement} kW`}
          </p>
          <p className="text-xs text-gray-500 mt-1">300 W pro Person</p>
        </div>
      </div>
      <div className="bg-primary/5 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Detaillierte Heizlastberechnung</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium">1. Grundlast</h4>
            <p className="text-sm text-gray-600">
              Spezifische Heizlast: {formData.livingSpace == "" ? 0 : Math.round(results.unreducedLoad / parseInt(formData.livingSpace) * 100 * 1000) / 100} W/m²
            </p>
            <p className="text-sm text-gray-600">
              Wohnfläche: {formData.livingSpace} m²
            </p>
            <p className="text-sm font-medium text-primary">
              Grundlast gesamt: {Math.round(results.unreducedLoad * 100) / 100} kW
            </p>
          </div>





          <div className="space-y-2">
            <h4 className="font-medium">2. Reduktionen durch Sanierung</h4>

            <p className="text-sm text-gray-600">
              Dach: -{100 * results.roofReduction}%
            </p>
            <p className="text-sm text-gray-600">
              Fenster: -{100 * results.windowsReduction}%
            </p>

            <p className="text-sm text-gray-600">
              Fassade: -{100 * results.facadeReduction}%
            </p>

            <p className="text-sm font-medium text-primary">
              Reduktion gesamt: -{Math.round((results.unreducedLoad - results.baseHeatingLoad) * 100) / 100} kW ({Math.round((results.roofReduction + results.windowsReduction + results.facadeReduction) * 100)}%)
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">3. Personenlast</h4>
            <p className="text-sm text-gray-600">
              Anzahl Personen: {formData.occupants}
            </p>
            <p className="text-sm text-gray-600">
              Last pro Person: 300 W
            </p>
            <p className="text-sm font-medium text-primary">
              Personenlast gesamt: {results.occupantsSupplement} kW
            </p>
          </div>

          <div className="pt-4 border-t mt-4">
            <h4 className="font-medium text-lg">Gesamte Heizlast</h4>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-primary">
                {Math.round(results.totalHeatingLoad * 100) / 100} kW
              </p>
              <p className="text-sm text-gray-600">
                ({formData.livingSpace == "" ? 0 : Math.round(100 * 1000 * results.totalHeatingLoad / parseInt(formData.livingSpace)) / 100} W/m²)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Norm-Tiefsttemperatur</p>
          <p className="text-2xl font-bold text-primary">
            {climateData ? `${climateData.design_temperature}°C` : "N/A"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Standortbasiert</p>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Durchschnittstemperatur</p>
          <p className="text-2xl font-bold text-primary">
            {climateData ? `${climateData.average_temperature}°C` : "N/A"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Standortbasiert</p>
        </div>
      </div>
      <div className="space-y-6">
      <HeatingLoadChart results={results} formData={formData} climateData={climateData} />
    </div>
    </div>
  );
};

export default ResultsDisplay;
