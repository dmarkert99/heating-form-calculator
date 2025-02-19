import { BuildingData } from "@/lib/heatingCalculations";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ResultsDisplayProps } from "./ResultsDisplay";

const dummyData = (formData: BuildingData) => {
  return([
  { name: "Jan", heizlast: 583.23*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Feb", heizlast: 512.11*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Mär", heizlast: 465.53*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Apr", heizlast: 299.84*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Mai", heizlast: 165.08*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Jun", heizlast: 47.93*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Jul", heizlast: 16.20*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Aug", heizlast: 23.94*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Sep", heizlast: 116.88*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Okt", heizlast: 282.14*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Nov", heizlast: 431.14*parseInt(formData.energyConsumption)/3483.0 },
  { name: "Dez", heizlast: 538.97*parseInt(formData.energyConsumption)/3483.0 },
])
}

export const HeatingLoadChart = ({ formData}: ResultsDisplayProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData(formData)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ angle: -90, position: 'insideBottomLeft' }}/>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="heizlast"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};