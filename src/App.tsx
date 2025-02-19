import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Heizlast from "./pages/Heizlast";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import Index from "./pages/Index";
import Kfw from "./pages/Kfw";
import Auth from "./pages/Auth";
import { supabase } from '@/integrations/supabase/client';
import Requests from "./pages/Requests";
import Datenerfassung from "./pages/Datenerfassung";

const queryClient = new QueryClient();

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              isAuthenticated ? (
                <Index />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            
            <Route 
              path="/auth" 
              element={
                !isAuthenticated ? (
                  <Auth />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/datenerfassung" 
              element={
                isAuthenticated ? (
                  <Datenerfassung />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route 
              path="/datenerfassung/requests" 
              element={
                isAuthenticated ? (
                  <Requests />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route 
              path="/heizlast" 
              element={
                isAuthenticated ? (
                  <Heizlast />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route 
              path="/kfw-rechner" 
              element={
                isAuthenticated ? (
                  <Kfw />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route 
              path="/placeholder" 
              element={
                isAuthenticated ? (
                  <Placeholder />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
