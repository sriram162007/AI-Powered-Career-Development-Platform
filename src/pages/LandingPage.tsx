import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { LandingBackground } from "@/components/landing/LandingBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { HumanQuestions } from "@/components/landing/HumanQuestions";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { PlatformVisual } from "@/components/landing/PlatformVisual";
import { IndiaContext } from "@/components/landing/IndiaContext";
import { CareerPaths } from "@/components/landing/CareerPaths";
import { StudentJourney } from "@/components/landing/StudentJourney";
import { CollegeInstitutionSection } from "@/components/landing/CollegeInstitutionSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { PublicFooter } from "@/components/landing/PublicFooter";

export default function LandingPage() {
  return (
    <LandingBackground>
      <PublicNavbar />
      <main>
        <HeroSection />
        <HumanQuestions />
        <ProblemSection />
        <HowItWorks />
        <FeatureShowcase />
        <PlatformVisual />
        <IndiaContext />
        <CareerPaths />
        <StudentJourney />
        <CollegeInstitutionSection />
        <PricingSection />
        <TrustSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <PublicFooter />
    </LandingBackground>
  );
}
