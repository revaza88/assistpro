import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section"; // Will be the modified one
import HomepageServicesOverview from "@/components/HomepageServicesOverview";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import HomepageFinalCtaSection from "@/components/HomepageFinalCtaSection";
import Footer from "@/components/footer";
import FaqSection from "@/components/FaqSection";
// Removed AboutSection, ServicesSection (original), TeamSection, CareerSection, ContactSection
// as these are now separate pages or replaced.

export default function Home() {
  return (
    <div className="site-home min-h-screen">
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <HomepageServicesOverview />
        <HowWeWorkSection />        <FaqSection compact />
        <HomepageFinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
