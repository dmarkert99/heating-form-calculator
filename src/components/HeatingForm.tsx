
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Calculator, Home } from "lucide-react";

interface BuildingData {
  constructionYear: string;
  livingSpace: string;
  occupants: string;
  condensingBoiler: boolean;
  roofCondition: string;
  facadeCondition: string;
  windowsCondition: string;
  energyConsumption: string;
}

export var heatData={
  specificHeatingLoad: 0 ,
  baseHeatingLoad: 0,
  occupantsSupplement:0,
  totalHeatingLoad:0,
  roofReduction:0,
  windowsReduction:0,
  facadeReduction:0,
  unreducedLoad: 0
}

export const HeatingForm = () => {
  const [formData, setFormData] = useState<BuildingData>({
    constructionYear: "",
    livingSpace: "",
    occupants: "",
    condensingBoiler: false,
    roofCondition: "unsaniert",
    facadeCondition: "unsaniert",
    windowsCondition: "unsaniert",
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

  heatData = calculateHeatingLoad(formData);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Gebäudedaten
            </CardTitle>
          </CardHeader>
          <CardContent>
      <div className="space-y-2">
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
          {/*}
          <div className="flex items-center space-x-2">
            <Switch
              id="condensingBoiler"
              checked={formData.condensingBoiler}
              onCheckedChange={(checked) =>
                handleInputChange("condensingBoiler", checked)
              }
            />
            <Label htmlFor="condensingBoiler">Brennwertgerät</Label>
          </div>
          */}
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
                <SelectItem value="saniert">saniert</SelectItem>
                <SelectItem value="teilsaniert">teilsaniert</SelectItem>
                <SelectItem value="unsaniert">unsaniert</SelectItem>
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
                <SelectItem value="saniert">saniert</SelectItem>
                <SelectItem value="teilsaniert">teilsaniert</SelectItem>
                <SelectItem value="unsaniert">unsaniert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="windowsCondition">Sanierungsstand Fenster</Label>
            <Select
              value={formData.windowsCondition}
              onValueChange={(value) => handleInputChange("windowsCondition", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie den Zustand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saniert">saniert</SelectItem>
                <SelectItem value="teilsaniert">teilsaniert</SelectItem>
                <SelectItem value="unsaniert">unsaniert</SelectItem>
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
      </CardContent>
      </Card>
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Ergebnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
      <ResultsDisplay results={heatData} formData={formData} />
      </CardContent>
        </Card>
    </div>
  );
};

export default HeatingForm;
