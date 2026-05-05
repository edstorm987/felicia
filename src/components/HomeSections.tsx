"use client";

import dynamic from "next/dynamic";
import VSLSection from "@/components/VSLSection";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Opportunities from "@/components/Opportunities";
import HowItWorks from "@/components/HowItWorks";
import InterestForm from "@/components/InterestForm";

const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true, loading: () => null });

export default function HomeSections() {
  return (
    <>
      <VSLSection />
      <Problem />
      <Solution />
      <Opportunities />
      <HowItWorks />
      <InterestForm />
      <Testimonials />
    </>
  );
}
