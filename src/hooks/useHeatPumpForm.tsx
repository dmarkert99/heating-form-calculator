import { useState } from 'react';
import { FormData } from '@/types/heatPumpForm';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export const useHeatPumpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    postalCode: '',
    heatingLoad: '',
    fuelConsumption: '',
    tariffModule: 'module1',
    constructionYear: '',
    livingArea: '',
    roofInsulated: 'no',
    windowsInsulated: 'no',
    facadeInsulated: 'no',
    heatingInstallYear: '',
    boilerType: 'standard',
    heatingPower: '',
    fuelType: '',
    additionalHeatSource: 'no',
    additionalHeatSourceType: '',
    additionalHeatSourceSupport: 'water',
    mixedCircuits: '',
    unmixedCircuits: '',
    householdPersons: '',
    waterHeatingType: 'central',
    waterTankSize: '',
    waterComfort: 'none',
    isOwner: 'no',
    buildingPermitDate: '',
    fundableUnits: '',
    fundableArea: '',
    additionalCosts: '',
    distanceToHeatingRoom: '',
    installationType: '',
    groundMaterial: '',
    distanceToBuilding: '',
    narrowestPassage: '',
    heatingRoomHeight: '',
    heatingLocation: '',
    additionalInfo: '',
    contactEmail: '',
    contactPhone: '',
    preferredContact: 'email',
    appointmentType: 'onsite',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      postalCode: '',
      heatingLoad: '',
      fuelConsumption: '',
      tariffModule: 'module1',
      constructionYear: '',
      livingArea: '',
      roofInsulated: 'no',
      windowsInsulated: 'no',
      facadeInsulated: 'no',
      heatingInstallYear: '',
      boilerType: 'standard',
      heatingPower: '',
      fuelType: '',
      additionalHeatSource: 'no',
      additionalHeatSourceType: '',
      additionalHeatSourceSupport: 'water',
      mixedCircuits: '',
      unmixedCircuits: '',
      householdPersons: '',
      waterHeatingType: 'central',
      waterTankSize: '',
      waterComfort: 'none',
      isOwner: 'no',
      buildingPermitDate: '',
      fundableUnits: '',
      fundableArea: '',
      additionalCosts: '',
      distanceToHeatingRoom: '',
      installationType: '',
      groundMaterial: '',
      distanceToBuilding: '',
      narrowestPassage: '',
      heatingRoomHeight: '',
      heatingLocation: '',
      additionalInfo: '',
      contactEmail: '',
      contactPhone: '',
      preferredContact: 'email',
      appointmentType: 'onsite',
    });
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Sie müssen angemeldet sein, um das Formular zu senden.");
        return;
      }

      const { error } = await supabase
        .from('heat_pump_requests')
        .insert([
          {
            user_id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            postal_code: formData.postalCode,
            heating_load: formData.heatingLoad,
            fuel_consumption: formData.fuelConsumption,
            tariff_module: formData.tariffModule,
            construction_year: formData.constructionYear,
            living_area: formData.livingArea,
            roof_insulated: formData.roofInsulated,
            windows_insulated: formData.windowsInsulated,
            facade_insulated: formData.facadeInsulated,
            heating_install_year: formData.heatingInstallYear,
            boiler_type: formData.boilerType,
            heating_power: formData.heatingPower,
            fuel_type: formData.fuelType,
            additional_heat_source: formData.additionalHeatSource,
            additional_heat_source_type: formData.additionalHeatSourceType,
            additional_heat_source_support: formData.additionalHeatSourceSupport,
            mixed_circuits: formData.mixedCircuits,
            unmixed_circuits: formData.unmixedCircuits,
            household_persons: formData.householdPersons,
            water_heating_type: formData.waterHeatingType,
            water_tank_size: formData.waterTankSize,
            water_comfort: formData.waterComfort,
            is_owner: formData.isOwner,
            building_permit_date: formData.buildingPermitDate,
            fundable_units: formData.fundableUnits,
            fundable_area: formData.fundableArea,
            additional_costs: formData.additionalCosts,
            distance_to_heating_room: formData.distanceToHeatingRoom,
            installation_type: formData.installationType,
            ground_material: formData.groundMaterial,
            distance_to_building: formData.distanceToBuilding,
            narrowest_passage: formData.narrowestPassage,
            heating_room_height: formData.heatingRoomHeight,
            heating_location: formData.heatingLocation,
          }
        ]);

      if (error) throw error;

      toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error saving form:', error);
      toast.error("Beim Speichern ist ein Fehler aufgetreten.");
    }
  };

  return {
    formData,
    handleInputChange,
    handleRadioChange,
    handleSubmit,
    isSubmitted,
    resetForm
  };
};