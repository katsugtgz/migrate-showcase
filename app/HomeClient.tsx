"use client";

import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Projects from "@/components/Projects";
import IDCard from "@/components/IDCard";
import About from "@/components/About";
import Services from "@/components/Services";
import VTuberLogos from "@/components/VTuberLogos";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useLenis } from "@/hooks/useLenis";

export default function HomeClient() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Preloader />
      <main>
        <Navbar />
        <SequenceScroll />
        <Projects />
        <IDCard />
        <About />
        <VTuberLogos />
        <Marquee />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
