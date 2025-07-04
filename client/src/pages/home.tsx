import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section"; // Will be the modified one
import WhyUsSection from "@/components/WhyUsSection";
import HomepageServicesOverview from "@/components/HomepageServicesOverview";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import SocialProofSection from "@/components/SocialProofSection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import HomepageFinalCtaSection from "@/components/HomepageFinalCtaSection";
import Footer from "@/components/footer";
// Removed AboutSection, ServicesSection (original), TeamSection, CareerSection, ContactSection
// as these are now separate pages or replaced.

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navigation />
      <main>
        <HeroSection />
        <WhyUsSection />
        <HomepageServicesOverview />
        <HowWeWorkSection />
        <SocialProofSection />
        <BlogTeaserSection />
        <HomepageFinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
