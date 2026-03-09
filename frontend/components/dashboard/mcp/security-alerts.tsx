'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Ban, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const alerts = [
  {
    id: 'alert-1',
    severity: 'critical',
    type: 'injection_attempt',
    description: 'MCP server attempted to inject malicious tool definition',
    source: 'external-mcp-server-3',
    action: 'blocked',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 'alert-2',
    severity: 'high',
    type: 'unauthorized_access',
    description: 'Agent attempted to access restricted filesystem path',
    source: 'Coder Agent',
    action: 'blocked',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: 'alert-3',
    severity: 'medium',
    type: 'policy_violation',
    description: 'Tool call exceeded rate limit',
    source: 'Deploy Agent',
    action: 'throttled',
    timestamp: new Date(Date.now() - 28 * 60 * 1000),
  },
];

export function SecurityAlerts() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Security Alerts
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8 border-slate-700">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-lg border ${
                alert.severity === 'critical' ? 'border-red-500/50 bg-red-500/10' :
                alert.severity === 'high' ? 'border-amber-500/50 bg-amber-500/10' :
                'border-blue-500/50 bg-blue-500/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.severity === 'critical' ? 'text-red-500' :
                    alert.severity === 'high' ? 'text-amber-500' :
                    'text-blue-500'
                  }`} />
                  <Badge className={
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'high' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }>
                    {alert.severity}
                  </Badge>
                </div>
                <Badge variant="outline" className="border-slate-700 text-slate-400">
                  {alert.action}
                </Badge>
              </div>
              
              <h4 className="font-medium text-white mb-1 capitalize">
                {alert.type.replace('_', ' ')}
              </h4>
              <p className="text-sm text-slate-400 mb-2">{alert.description}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Source: {alert.source}</span>
                <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
