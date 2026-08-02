"use client";

import { useCallback, useEffect, useRef } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Projects from "@/components/Projects";
import IDCard from "@/components/IDCard";
import About from "@/components/About";
import VTuberLogos from "@/components/VTuberLogos";
import Marquee from "@/components/Marquee";
import Quote from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CursorToggle from "@/components/CursorToggle";
import { IDENTITY } from "@/lib/constants";
import Lenis from "lenis";

export default function HomeClient() {
  const lenisRef = useRef<Lenis | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handlePreloaderComplete = useCallback(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    }
    animationFrameRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={handlePreloaderComplete} />
        <Navbar />
        <main id="main" tabIndex={-1}>
        <h1 className="sr-only">{IDENTITY.name}: Portfolio</h1>
        <SequenceScroll />

        {/* First section after sticky canvas — pulls up to overlap SequenceScroll area */}
        <div className="-mt-[100vh] relative z-10">
          <Marquee />
        </div>

        <About />
        <VTuberLogos />

        {/* Fariz-only: 3D ID card */}
        <IDCard />

        <Projects />
        <Quote />
        <Contact />
        <Footer />
        <CursorToggle />

        {/* Services section removed from homepage */}
      </main>
    </>
  );
}
