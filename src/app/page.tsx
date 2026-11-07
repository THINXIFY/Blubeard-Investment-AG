import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { InvestmentUniverse } from "@/components/home/InvestmentUniverse";
import { Philosophy } from "@/components/home/Philosophy";
import { Services } from "@/components/home/Services";
import { Approach } from "@/components/home/Approach";
import { Leadership } from "@/components/home/Leadership";
import { Perspective } from "@/components/home/Perspective";
import { ContactCta } from "@/components/home/ContactCta";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { socialMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Blubeard Investment AG — Swiss Investment Company in Samedan";

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.description,
  alternates: { canonical: "/" },
  ...socialMetadata({ path: "/", title, description: site.description }),
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <InvestmentUniverse />
      <Philosophy />
      <Services />
      <Approach />
      <Leadership />
      <Perspective />
      <ContactCta />
      <HomeJsonLd />
    </div>
  );
}
