import { AnalysisForm } from "../components/forms/AnalysisForm";
import { HeroSection } from "../components/sections/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />

      <section className="container-app py-10 md:py-14">
        <AnalysisForm />
      </section>
    </main>
  );
}