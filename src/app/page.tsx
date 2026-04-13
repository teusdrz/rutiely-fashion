"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
  }, []);

  return (
    <main className="relative min-h-screen" style={{ background: "#FFF1FC" }}>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <Navbar isVisible={loadingComplete} />
      <HeroSection isVisible={loadingComplete} />
      <AboutSection />
      <CategoriesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
