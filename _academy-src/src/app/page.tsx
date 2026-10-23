import { FinalCta, Footer } from "@/components/Closing";
import { FiberDivider } from "@/components/FiberWaves";
import { Hero } from "@/components/Hero";
import { Audience, Author, Chapters, Faq, NumbersBand } from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";

export default function Home() {
  return (
    <>
      <a href="#formulario" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:text-abyss">
        Ir para o formulário
      </a>
      <main>
        <Hero />
        <NumbersBand />
        <Chapters />
        <FiberDivider />
        <Audience />
        <Author />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
