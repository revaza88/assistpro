import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect, type ComponentType } from 'react';
import SeoHead from './components/SeoHead';
import Home from "@/pages/home";
// Animation code is needed by detail pages, not the initial home/calculator path.
const animatedPage = (load: () => Promise<{ default: ComponentType }>) => lazy(async () => {
  const [{ default: Page }, { default: Frame }] = await Promise.all([load(), import('@/components/MotionPage')]);
  return { default: () => <Frame><Page /></Frame> };
});
const ServicesPage = lazy(() => import('@/pages/services'));
const IndustriesPage = lazy(() => import('@/pages/industries'));
const FaqPage = lazy(() => import('@/pages/faq'));
const CalculatorPage = lazy(() => import('@/pages/calculator'));
import { InquiryDraftProvider } from "@/contexts/inquiry-draft";
const NotFound = animatedPage(() => import('@/pages/not-found'));
const AboutPage = animatedPage(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const TeamPage = animatedPage(() => import('@/pages/team'));
const CareerPage = animatedPage(() => import('@/pages/career'));
const AccountingServices = lazy(() => import('@/pages/services/accounting'));
const TaxServices = lazy(() => import('@/pages/services/tax'));
const LegalServices = animatedPage(() => import('@/pages/services/legal'));
const BusinessConsulting = animatedPage(() => import('@/pages/services/business'));
const AuditServices = lazy(() => import('@/pages/services/audit'));
const HRServices = animatedPage(() => import('@/pages/services/hr'));

function RouteFocus() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/industries" component={IndustriesPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/calculator" component={CalculatorPage} />
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
    <InquiryDraftProvider>
      <Suspense fallback={<p role="status" className="p-8 text-center">იტვირთება… / Loading…</p>}>
        <SeoHead /><Router /><RouteFocus />
      </Suspense>
    </InquiryDraftProvider>
  );
}

export default App;
