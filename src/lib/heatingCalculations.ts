
export interface BuildingData {
  constructionYear: string;
  livingSpace: string;
  occupants: string;
  condensingBoiler: boolean;
  roofCondition: string;
  facadeCondition: string;
  wallCondition: string;
  energyConsumption: string;
}

export interface CalculationResults {
  specificHeatingLoad: number;
  baseHeatingLoad: number;
  occupantsSupplement: number;
  totalHeatingLoad: number;
}

export const calculateHeatingLoad = (data: BuildingData): CalculationResults => {
  // Basis-Heizlast basierend auf Baujahr und Sanierungsstand
  let baseLoadFactor = 100; // W/m²

  const year = parseInt(data.constructionYear) || 2000;
  if (year < 1977) baseLoadFactor = 120;
  else if (year < 1995) baseLoadFactor = 100;
  else if (year < 2002) baseLoadFactor = 80;
  else if (year < 2009) baseLoadFactor = 70;
  else baseLoadFactor = 60;

  // Anpassungen basierend auf Sanierungszustand
  const conditions = [data.roofCondition, data.facadeCondition, data.wallCondition];
  const conditionFactors = conditions.map(condition => {
    switch (condition) {
      case "unsaniert": return 1;
      case "teilsaniert": return 0.925;
      case "saniert": return 0.85;
      default: return 1.0;
    }
  });

  const averageConditionFactor = conditionFactors.reduce((a, b) => a + b, 0) / conditionFactors.length;
  
  // Brennwertgerät-Faktor
  const condensingBoilerFactor = data.condensingBoiler ? 0.92 : 0.85;

  // Spezifische Heizlast berechnen
  const specificHeatingLoad = baseLoadFactor * averageConditionFactor * condensingBoilerFactor;

  // Wohnfläche
  const livingSpace = parseFloat(data.livingSpace) || 0;

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
    totalHeatingLoad
  };
};
