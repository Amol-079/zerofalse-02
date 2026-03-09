import { StatsCards } from '@/components/dashboard/overview/stats-cards';
import { LiveActivity } from '@/components/dashboard/overview/live-activity';
import { SecurityScore } from '@/components/dashboard/overview/security-score';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Real-time monitoring of your AI agent security</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveActivity />
        </div>
        <div>
          <SecurityScore />
        </div>
      </div>
    </div>
  );
}
