
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import ResultsDisplay from "./ResultsDisplay";
import { calculateHeatingLoad } from "@/lib/heatingCalculations";

interface BuildingData {
  constructionYear: string;
  livingSpace: string;
  occupants: string;
  condensingBoiler: boolean;
  roofCondition: string;
  facadeCondition: string;
  wallCondition: string;
  energyConsumption: string;
}

const HeatingForm = () => {
  const [formData, setFormData] = useState<BuildingData>({
    constructionYear: "",
    livingSpace: "",
    occupants: "",
    condensingBoiler: false,
    roofCondition: "gut",
    facadeCondition: "gut",
    wallCondition: "gut",
    energyConsumption: "",
  });

  const handleInputChange = (
    field: keyof BuildingData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const results = calculateHeatingLoad(formData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Gebäudedaten
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="constructionYear">Baujahr</Label>
            <Input
              id="constructionYear"
              type="number"
              placeholder="z.B. 1990"
              value={formData.constructionYear}
              onChange={(e) =>
                handleInputChange("constructionYear", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="livingSpace">Wohnfläche (m²)</Label>
            <Input
              id="livingSpace"
              type="number"
              placeholder="z.B. 120"
              value={formData.livingSpace}
              onChange={(e) => handleInputChange("livingSpace", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupants">Anzahl Personen im Haushalt</Label>
            <Input
              id="occupants"
              type="number"
              placeholder="z.B. 4"
              value={formData.occupants}
              onChange={(e) => handleInputChange("occupants", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="condensingBoiler"
              checked={formData.condensingBoiler}
              onCheckedChange={(checked) =>
                handleInputChange("condensingBoiler", checked)
              }
            />
            <Label htmlFor="condensingBoiler">Brennwertgerät vorhanden</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roofCondition">Sanierungsstand Dach</Label>
            <Select
              value={formData.roofCondition}
              onValueChange={(value) => handleInputChange("roofCondition", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie den Zustand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sehr_gut">Sehr gut</SelectItem>
                <SelectItem value="gut">Gut</SelectItem>
                <SelectItem value="mittel">Mittel</SelectItem>
                <SelectItem value="schlecht">Schlecht</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="facadeCondition">Sanierungsstand Fassade</Label>
            <Select
              value={formData.facadeCondition}
              onValueChange={(value) =>
                handleInputChange("facadeCondition", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie den Zustand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sehr_gut">Sehr gut</SelectItem>
                <SelectItem value="gut">Gut</SelectItem>
                <SelectItem value="mittel">Mittel</SelectItem>
                <SelectItem value="schlecht">Schlecht</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wallCondition">Sanierungsstand Wand</Label>
            <Select
              value={formData.wallCondition}
              onValueChange={(value) => handleInputChange("wallCondition", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie den Zustand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sehr_gut">Sehr gut</SelectItem>
                <SelectItem value="gut">Gut</SelectItem>
                <SelectItem value="mittel">Mittel</SelectItem>
                <SelectItem value="schlecht">Schlecht</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="energyConsumption">
              Heizenergieverbrauch (kWh/Jahr)
            </Label>
            <Input
              id="energyConsumption"
              type="number"
              placeholder="z.B. 15000"
              value={formData.energyConsumption}
              onChange={(e) =>
                handleInputChange("energyConsumption", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <ResultsDisplay results={results} formData={formData} />
    </div>
  );
};

export default HeatingForm;
