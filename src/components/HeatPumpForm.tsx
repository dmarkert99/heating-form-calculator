import { useHeatPumpForm } from "@/hooks/useHeatPumpForm";
import FormLayout from "./form-layout/FormLayout";
import CustomerData from "./form-steps/CustomerData";
import PropertyAddress from "./form-steps/PropertyAddress";
import BuildingData from "./form-steps/BuildingData";
import HeatingSystem from "./form-steps/HeatingSystem";
import AdditionalHeatSources from "./form-steps/AdditionalHeatSources";
import HeatingCircuits from "./form-steps/HeatingCircuits";
import HouseholdWaterNeeds from "./form-steps/HouseholdWaterNeeds";
import HeatPumpLocation from "./form-steps/HeatPumpLocation";
import ElectricityTariff from "./form-steps/ElectricityTariff";
import HeatingLoad from "./form-steps/HeatingLoad";
import OwnershipAndFunding from "./form-steps/OwnershipAndFunding";
import FinalStep from "./form-steps/FinalStep";

const HeatPumpForm = () => {
  const { 
    formData, 
    handleInputChange, 
    handleRadioChange, 
    handleSubmit,
    isSubmitted,
    resetForm
  } = useHeatPumpForm();

  return (
    <FormLayout 
      onSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      onReset={resetForm}
    >
      <CustomerData 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <PropertyAddress 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <BuildingData 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <HeatingSystem 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <AdditionalHeatSources 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <HeatingCircuits 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <HouseholdWaterNeeds 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <HeatPumpLocation 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <ElectricityTariff 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <HeatingLoad 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <OwnershipAndFunding 
        formData={formData} 
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
      <FinalStep
        formData={formData}
        handleInputChange={handleInputChange}
        handleRadioChange={handleRadioChange}
      />
    </FormLayout>
  );
};

export default HeatPumpForm;