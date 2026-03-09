import { SessionTimeline } from '@/components/dashboard/sessions/session-timeline';
import { DriftDetector } from '@/components/dashboard/sessions/drift-detector';
import { MemoryFirewall } from '@/components/dashboard/sessions/memory-firewall';

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Session Monitoring</h1>
        <p className="text-slate-400">Track long-running sessions and detect intent drift</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SessionTimeline />
        <DriftDetector />
        <MemoryFirewall />
      </div>
    </div>
  );
}
