import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import ReportLostItem from "./pages/ReportLostItem";
import ReportFoundItem from "./pages/ReportFoundItem";
import Reports from "./pages/Reports";
import HowItWorks from "./pages/HowItWorks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* Formerly Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/report-lost" element={<ReportLostItem />} />
        <Route path="/report-found" element={<ReportFoundItem />} />
        <Route path="/reports" element={<Reports />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthProvider>
);

export default App;
