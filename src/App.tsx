import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import Index from "./pages/Index";
import Vote from "./pages/Vote";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AccessibilityProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/confirmation" element={<Confirmation />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            {/* Persistent Accessibility Panel */}
            <AccessibilityPanel />
          </TooltipProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
