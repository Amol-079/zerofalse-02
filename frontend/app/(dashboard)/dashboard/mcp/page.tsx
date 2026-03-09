import { MCPProxyStatus } from '@/components/dashboard/mcp/mcp-proxy-status';
import { ToolCallMonitor } from '@/components/dashboard/mcp/tool-call-monitor';
import { SecurityAlerts } from '@/components/dashboard/mcp/security-alerts';

export default function MCPPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">MCP Proxy Monitor</h1>
        <p className="text-slate-400">Real-time monitoring of Model Context Protocol security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MCPProxyStatus />
        <div className="lg:col-span-2">
          <ToolCallMonitor />
        </div>
      </div>

      <SecurityAlerts />
    </div>
  );
}
