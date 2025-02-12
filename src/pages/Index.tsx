
import HeatingForm from "@/components/HeatingForm";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
          Heizlastberechnung
        </h1>
        <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
          <HeatingForm />
        </Card>
      </div>
    </div>
  );
};

export default Index;
