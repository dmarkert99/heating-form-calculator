import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Requests = () => {
  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['heatPumpRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('heat_pump_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching requests:', error);
        throw error;
      }
      return data;
    },
  });

  if (isLoading) return <div>Lädt...</div>;
  
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Wärmepumpen-Anfragen</h1>
          <Button onClick={() => window.print()}>Exportieren</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>PLZ</TableHead>
              <TableHead>Heizlast</TableHead>
              <TableHead>Standort</TableHead>
              <TableHead>Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  {new Date(request.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {request.first_name} {request.last_name}
                </TableCell>
                <TableCell>{request.postal_code}</TableCell>
                <TableCell>{request.heating_load.toString() || '-'}</TableCell>
                <TableCell>{request.heating_location || '-'}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Requests;