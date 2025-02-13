
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
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"

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
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
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

  const handleProjectSelect = (currentValue: string) => {
    setSelectedProjectId(currentValue);
    const selectedProject = projects.find(p => p.id === currentValue);
    if (selectedProject) {
      clientData.id = selectedProject.id;
      clientData.first_name = selectedProject.first_name;
      clientData.last_name = selectedProject.last_name;
      
      setFormData(prev => ({
        ...prev,
        constructionYear: selectedProject.construction_year || "",
        livingSpace: selectedProject.living_area || "",
      }));
    }
    setOpen(false);
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
                <Label>Projekt auswählen</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedProjectId ? (
                        projects.find((project) => project.id === selectedProjectId)?.first_name + " " +
                        projects.find((project) => project.id === selectedProjectId)?.last_name
                      ) : (
                        "Projekt auswählen..."
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Namen eingeben..." />
                      <CommandEmpty>Kein Projekt gefunden.</CommandEmpty>
                      <CommandGroup>
                        {projects.map((project) => (
                          <CommandItem
                            key={project.id}
                            value={project.first_name + " " + project.last_name}
                            onSelect={() => handleProjectSelect(project.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProjectId === project.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {project.first_name} {project.last_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
          <ResultsDisplay results={heatData} formData={formData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HeatingForm;
