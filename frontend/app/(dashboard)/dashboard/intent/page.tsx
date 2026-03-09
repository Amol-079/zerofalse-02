import { IntentChain } from '@/components/dashboard/intent/intent-chain';
import { IntentValidator } from '@/components/dashboard/intent/intent-validator';
import { ViolationCard } from '@/components/dashboard/intent/violation-card';

export default function IntentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Intent Verification</h1>
        <p className="text-slate-400">Track and validate intent across agent chains</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IntentChain />
        <IntentValidator />
      </div>

      <ViolationCard />
    </div>
  );
}
