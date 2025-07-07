
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BuyerAssistant from "./pages/BuyerAssistant";
import TMTBars from "./pages/TMTBars";
import Resistors from "./pages/Resistors";
import InverterCalculator from "./pages/InverterCalculator";
import SolarPanel from "./pages/SolarPanel";
import CementCalculator from "./pages/CementCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buyer-assistant" element={<BuyerAssistant />} />
          <Route path="/tmt-bars" element={<TMTBars />} />
          <Route path="/resistors" element={<Resistors />} />
          <Route path="/inverter-calculator" element={<InverterCalculator />} />
          <Route path="/solar-panel" element={<SolarPanel />} />
          <Route path="/cement-calculator" element={<CementCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
