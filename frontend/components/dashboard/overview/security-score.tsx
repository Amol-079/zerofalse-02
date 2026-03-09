'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const metrics = [
  { label: 'Intent Alignment', value: 98, color: 'bg-emerald-500' },
  { label: 'Delegation Safety', value: 95, color: 'bg-blue-500' },
  { label: 'MCP Security', value: 100, color: 'bg-purple-500' },
  { label: 'Memory Integrity', value: 92, color: 'bg-amber-500' },
];

export function SecurityScore() {
  const overallScore = Math.round(metrics.reduce((acc, m) => acc + m.value, 0) / metrics.length);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500" />
          Security Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-800"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className={overallScore >= 90 ? 'text-emerald-500' : overallScore >= 70 ? 'text-amber-500' : 'text-red-500'}
                initial={{ strokeDasharray: '0 351.86' }}
                animate={{ strokeDasharray: `${(overallScore / 100) * 351.86} 351.86` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{overallScore}</span>
              <span className="text-xs text-slate-400">Overall</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric, i) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-400">{metric.label}</span>
                <span className="text-sm font-medium text-white">{metric.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`h-full ${metric.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-sm">
            {overallScore >= 90 ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-400">Excellent security posture</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-amber-400">Attention recommended</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
