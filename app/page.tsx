import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Realisations from "@/components/Realisations";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Realisations />
      <Process />
      <Stats />
      <Partners />
      <Blog />
      <FAQ />
      <Newsletter />
    </main>
  );
}
