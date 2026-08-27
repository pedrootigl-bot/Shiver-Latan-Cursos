import { Hero } from "@/components/Hero";
import { Modules } from "@/components/Modules";
import { Results } from "@/components/Results";
import { Mentor } from "@/components/Mentor";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--blue)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <main id="conteudo-principal">
        <Hero />
        <Modules />
        <Results />
        <Mentor />
        <Footer />
      </main>
    </>
  );
}
