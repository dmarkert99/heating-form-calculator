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
import { useProjectManagement } from "@/hooks/useProjectManagement";
import { supabase } from "@/integrations/supabase/client";

interface BuildingData {
  constructionYear: string;
  livingSpace: string;
  occupants: string;
  condensingBoiler: boolean;
  roofCondition: string;
  facadeCondition: string;
  windowsCondition: string;
  energyConsumption: string;
  postal_code: string;
  city: string;
}

export var clientData = {
  id: "",
  first_name: "",
  last_name: ""
}

export var heatData = {
  specificHeatingLoad: 0,
  baseHeatingLoad: 0,
  occupantsSupplement: 0,
  totalHeatingLoad: 0,
  roofReduction: 0,
  windowsReduction: 0,
  facadeReduction: 0,
  unreducedLoad: 0
}

export const HeatingForm = () => {
  const { projects } = useProjectManagement();
  const [climateData, setClimateData] = useState<{
    design_temperature: number;
    average_temperature: number;
  } | null>(null);
  const [formData, setFormData] = useState<BuildingData>({
    constructionYear: "",
    livingSpace: "",
    occupants: "",
    condensingBoiler: false,
    roofCondition: "unsaniert",
    facadeCondition: "unsaniert",
    windowsCondition: "unsaniert",
    energyConsumption: "",
    postal_code: "",
    city: "",
  });

  const handleInputChange = async (
    field: keyof BuildingData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field == "postal_code") {
      console.log('Fetched PLZ:', value);
      const { data } = await supabase
        .from('climate_data')
        .select(`
        design_temperature,
        average_temperature,
        postal_code,
        city
      `)
        .eq('postal_code', value.toString())
        .order('postal_code', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (data) {

        console.log('Fetched heating data:', data);
        setClimateData({
          design_temperature: data.design_temperature,
          average_temperature: data.average_temperature
        });
        setFormData(prev => ({
          ...prev,
          city: data.city || ""
        }));
      }
    }

  };
  const handleProjectSelect = async (projectId: string) => {
    const selectedProject = projects.find(p => p.id === projectId);

    if (selectedProject) {
      clientData.id = selectedProject.id;
      clientData.first_name = selectedProject.first_name;
      clientData.last_name = selectedProject.last_name;

      const { data } = await supabase
        .from('heat_pump_requests')
        .select(`
        climate_data!inner (
          design_temperature,
          average_temperature,
          city
        ),
        id
      `)
        .eq('id',projectId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        console.log('Fetched heating data:', data);
        if (data.climate_data) {
          setClimateData({
            design_temperature: data.climate_data.design_temperature,
            average_temperature: data.climate_data.average_temperature
          });
          setFormData(prev => ({
            ...prev,
            city: data.climate_data.city
          }))
        }
      }

      setFormData(prev => ({
        ...prev,
        constructionYear: selectedProject.construction_year || "",
        livingSpace: selectedProject.living_area || "",
        postal_code: selectedProject.postal_code,
        energyConsumption: selectedProject.fuel_consumption,
        occupants: selectedProject.household_persons,
        roofCondition: selectedProject.roof_insulated.toLowerCase(),
        facadeCondition: selectedProject.facade_insulated.toLowerCase(),
        windowsCondition: selectedProject.windows_insulated.toLowerCase()
      }));
    }
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
                <Label htmlFor="projectSelect">Projekt auswählen</Label>
                <Select onValueChange={handleProjectSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie ein Projekt" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.first_name} {project.last_name} - {project.postal_code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postleitzahl</Label>
                  <Input
                    id="postal_code"
                    type="number"
                    placeholder="z.B. 39122"
                    value={formData.postal_code}
                    onChange={(e) =>
                      handleInputChange("postal_code", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Stadt</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    readOnly
                    className="bg-gray-100"
                    onChange={(e) =>
                      handleInputChange("city", e.target.value)
                    }
                  />
                </div>
              </div>

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
          <ResultsDisplay results={heatData} formData={formData} climateData={climateData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HeatingForm;
