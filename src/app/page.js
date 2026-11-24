"use client";

import { useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

function PortfolioShell() {
  const containerRef = useRef(null);
  useGSAPAnimations(containerRef);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col">
      <PageLoader />
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <SmoothScroll>
      <PortfolioShell />
    </SmoothScroll>
  );
}
