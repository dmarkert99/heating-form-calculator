import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";
const Placeholder = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Construction className="h-8 w-8 text-primary" />
          In Entwicklung
        </h1>
        <p className="text-gray-600 mt-2">
          Diese Funktion wird noch entwickelt
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Platzhalter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Dieser Bereich befindet sich noch in der Entwicklung. Bitte versuchen Sie es später erneut.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Placeholder;