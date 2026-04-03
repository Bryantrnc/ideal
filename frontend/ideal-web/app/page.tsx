import { HeroSection } from "../components/sections/HeroSection";
import { AnalysisForm } from "../components/forms/AnalysisForm";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="space-y-8">
        <HeroSection />
        <AnalysisForm />
      </div>
    </main>
  );
}