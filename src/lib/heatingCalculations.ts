
export interface BuildingData {
  constructionYear: string;
  livingSpace: string;
  occupants: string;
  condensingBoiler: boolean;
  roofCondition: string;
  facadeCondition: string;
  windowsCondition: string;
  energyConsumption: string;
}

export interface CalculationResults {
  specificHeatingLoad: number;
  baseHeatingLoad: number;
  occupantsSupplement: number;
  totalHeatingLoad: number;
  roofReduction: number;
  windowsReduction: number;
  facadeReduction: number;
  unreducedLoad: number;
}

export const calculateHeatingLoad = (data: BuildingData): CalculationResults => {
  // Basis-Heizlast basierend auf Baujahr und Sanierungsstand
  let baseLoadFactor = 100; // W/m²

  const year = parseInt(data.constructionYear) || 2000;
  if (year < 1959) baseLoadFactor = 140;
  else if (year < 1969) baseLoadFactor = 130;
  else if (year < 1974) baseLoadFactor = 120;
  else if (year < 1978) baseLoadFactor = 115;
  else if (year < 1984) baseLoadFactor = 95;
  else if (year < 1995) baseLoadFactor = 75;
  else if (year < 2003) baseLoadFactor = 60;
  else if (year < 2010) baseLoadFactor = 55;
  else if (year < 2013) baseLoadFactor = 45;
  else if (year < 2017) baseLoadFactor = 30;
  else baseLoadFactor = 25;

  const calculateInsulationReduction = (
    insulation: string | undefined,
    type: 'roof' | 'windows' | 'facade'
  ): number => {
    if (!insulation) return 0;

    const reductions = {
      roof: { teilsaniert: 0.05, saniert: 0.10 },
      windows: { teilsaniert: 0.05, saniert: 0.10 },
      facade: { teilsaniert: 0.10, saniert: 0.15 }
    };

    if (insulation === 'unsaniert') return 0;
    return reductions[type][insulation as 'teilsaniert' | 'saniert'] || 0;
  };
  // Apply insulation reductions
  const roofReduction = calculateInsulationReduction(data.roofCondition, 'roof');
  const windowsReduction = calculateInsulationReduction(data.windowsCondition, 'windows');
  const facadeReduction = calculateInsulationReduction(data.facadeCondition, 'facade');

  console.log("Reductions:", { roofReduction, windowsReduction, facadeReduction });

  // Apply reductions to total load
  const totalReduction = roofReduction + windowsReduction + facadeReduction;

  // Brennwertgerät-Faktor
  const condensingBoilerFactor = data.condensingBoiler ? 0.92 : 0.85;

  // Spezifische Heizlast berechnen
  const specificHeatingLoad = baseLoadFactor * (1 - totalReduction);//* condensingBoilerFactor;

  // Wohnfläche
  const livingSpace = parseFloat(data.livingSpace) || 0;

  const unreducedLoad = baseLoadFactor * livingSpace / 1000;

  // Basis-Heizlast
  const baseHeatingLoad = (specificHeatingLoad * livingSpace) / 1000; // Umrechnung in kW

  // Personenzuschlag (300W pro Person)
  const occupants = parseInt(data.occupants) || 0;
  const occupantsSupplement = (occupants * 300) / 1000; // Umrechnung in kW

  // Gesamte Heizlast
  const totalHeatingLoad = baseHeatingLoad + occupantsSupplement;

  return {
    specificHeatingLoad,
    baseHeatingLoad,
    occupantsSupplement,
    totalHeatingLoad,
    roofReduction,
    windowsReduction,
    facadeReduction,
    unreducedLoad,
  };
};
