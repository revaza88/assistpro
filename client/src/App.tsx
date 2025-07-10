import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AboutPage from "@/pages/about"; // New
import ContactPage from "@/pages/contact"; // New
import TeamPage from "@/pages/team"; // New
import CareerPage from "@/pages/career"; // New
import AccountingServices from "@/pages/services/accounting";
import TaxServices from "@/pages/services/tax";
import LegalServices from "@/pages/services/legal";
import BusinessConsulting from "@/pages/services/business"; // Name kept, but content is Business Assist
import AuditServices from "@/pages/services/audit";
import HRServices from "@/pages/services/hr";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} /> {/* New */}
      <Route path="/contact" component={ContactPage} /> {/* New */}
      <Route path="/team" component={TeamPage} /> {/* New */}
      <Route path="/career" component={CareerPage} /> {/* New */}
      <Route path="/services/accounting" component={AccountingServices} />
      <Route path="/services/tax" component={TaxServices} />
      <Route path="/services/legal" component={LegalServices} />
      <Route path="/services/business" component={BusinessConsulting} /> {/* Path kept, component name too */}
      <Route path="/services/audit" component={AuditServices} />
      <Route path="/services/hr" component={HRServices} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
