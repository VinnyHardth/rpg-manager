"use client";

import FeaturesSection from "./components/Landing/FeaturesSection";
import Footer from "./components/Landing/Footer";
import HeroSection from "./components/Landing/HeroSection";
import PartnersSection from "./components/Landing/PartnersSection";
import RecruitersSection from "./components/Landing/RecruitersSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <FeaturesSection />
      <RecruitersSection />
      <Footer />
    </>
  );
}
