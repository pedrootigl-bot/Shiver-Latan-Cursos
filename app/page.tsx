import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";

const Modules = dynamic(() =>
  import("@/components/Modules").then((mod) => mod.Modules),
);
const Results = dynamic(() =>
  import("@/components/Results").then((mod) => mod.Results),
);
const Mentor = dynamic(() =>
  import("@/components/Mentor").then((mod) => mod.Mentor),
);
const UrgencyCta = dynamic(() =>
  import("@/components/UrgencyCta").then((mod) => mod.UrgencyCta),
);
const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.Footer),
);

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
        <UrgencyCta />
        <Footer />
      </main>
    </>
  );
}
