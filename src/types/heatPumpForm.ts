export interface FormData {
  // Kundendaten
  firstName: string;
  lastName: string;
  postalCode: string;
  birthDate?: string;
  internalId?: string;

  // Objektadresse
  street?: string;
  houseNumber?: string;
  city?: string;
  propertyPostalCode?: string;

  // Gebäudedaten
  constructionYear?: string;
  livingArea?: string;
  roofInsulated: "yes" | "no";
  windowsInsulated: "yes" | "no";
  facadeInsulated: "yes" | "no";

  // Heizlast
  heatingLoad?: string;
  fuelConsumption?: string;

  // Heizungsanlage
  heatingLocation?: string;
  heatingInstallYear?: string;
  boilerType: "condensing" | "lowTemp" | "standard";
  heatingPower?: string;
  fuelType?: string;

  // Weitere Wärmequellen
  additionalHeatSource: "yes" | "no";
  additionalHeatSourceType?: string;
  additionalHeatSourceSupport: "water" | "heating" | "both";

  // Heizkreise
  mixedCircuits?: string;
  unmixedCircuits?: string;

  // Warmwasser
  householdPersons?: string;
  waterHeatingType: "central" | "decentralized" | "none";
  waterTankSize?: string;
  waterComfort: "none" | "circulation" | "rainShower";

  // Eigentum & Förderung
  isOwner: "yes" | "no";
  buildingPermitDate?: string;
  fundableUnits?: string;
  fundableArea?: string;
  additionalCosts?: string;

  // Wärmepumpen-Aufstellort
  distanceToHeatingRoom?: string;
  installationType?: string;
  groundMaterial?: string;
  distanceToBuilding?: string;
  narrowestPassage?: string;
  heatingRoomHeight?: string;

  // Stromtarif
  tariffModule?: "module1" | "module2" | "module3";

  // Abschluss
  additionalInfo?: string;
  contactEmail?: string;
  contactPhone?: string;
  preferredContact?: "email" | "phone";
  appointmentType?: "onsite" | "video";
}

export interface FormStepProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRadioChange: (name: string, value: string) => void;
  onBack?: () => void;
}