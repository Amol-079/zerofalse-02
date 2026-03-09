'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const proxyStats = {
  status: 'active',
  uptime: '99.99%',
  totalCalls: 154329,
  blockedCalls: 23,
  avgLatency: '12ms',
  activeConnections: 8,
};

export function MCPProxyStatus() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            MCP Proxy Status
          </CardTitle>
          <div className="flex items-center gap-2">
            <motion.div
              animate={pulse ? { scale: [1, 1.2, 1] } : {}}
              className={`w-2 h-2 rounded-full ${
                proxyStats.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              {proxyStats.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Uptime</div>
            <div className="text-xl font-bold text-white">{proxyStats.uptime}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Avg Latency</div>
            <div className="text-xl font-bold text-white">{proxyStats.avgLatency}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Total Calls</div>
            <div className="text-xl font-bold text-white">{proxyStats.totalCalls.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Blocked</div>
            <div className="text-xl font-bold text-red-400">{proxyStats.blockedCalls}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-400 mb-3">Active Connections</h4>
          {Array.from({ length: proxyStats.activeConnections }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-950/30 border border-slate-800/50"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-slate-300">MCP Server {i + 1}</span>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
