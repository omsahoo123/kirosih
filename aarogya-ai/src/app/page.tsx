import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import RolesSection from "@/components/landing/RolesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import EmergencyBanner from "@/components/landing/EmergencyBanner";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RolesSection />
        <FeaturesSection />
        <HowItWorks />
        <EmergencyBanner />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
