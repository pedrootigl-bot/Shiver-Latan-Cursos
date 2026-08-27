import { Hero } from "@/components/Hero";
import { Modules } from "@/components/Modules";
import { Results } from "@/components/Results";
import { Mentor } from "@/components/Mentor";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Modules />
      <Results />
      <Mentor />
      <Footer />
    </main>
  );
}
