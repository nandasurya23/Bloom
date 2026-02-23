import type { Metadata } from "next";
import type { JSX } from "react";

import {
  AboutSection,
  ContactSection,
  FeaturedProducts,
  HeroSection,
  InfoSection
} from "@/components/home";

export const metadata: Metadata = {
  title: "Home",
  description: "Elegant online flower shopping experience with smooth, modern UX.",
  keywords: ["flower shop", "online florist", "bouquet gifts"],
  openGraph: {
    title: "Home | Bloom",
    description: "Elegant online flower shopping experience with smooth, modern UX.",
    type: "website"
  }
};

export default function HomePage(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <InfoSection />
      <ContactSection />
    </main>
  );
}
