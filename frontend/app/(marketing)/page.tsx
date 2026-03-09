import { Hero } from '@/components/marketing/hero';
import { ProblemSection } from '@/components/marketing/problem-section';
import { FeaturesGrid } from '@/components/marketing/features-grid';
import { AgentDemo } from '@/components/marketing/agent-demo';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Pricing } from '@/components/marketing/pricing';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FeaturesGrid />
      <AgentDemo />
      <HowItWorks />
      <Pricing />
    </>
  );
}
