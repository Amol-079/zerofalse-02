'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingDown, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const driftData = [
  { time: '0m', alignment: 100 },
  { time: '30m', alignment: 98 },
  { time: '1h', alignment: 97 },
  { time: '1h30m', alignment: 94 },
  { time: '2h', alignment: 92 },
  { time: '2h30m', alignment: 89 },
  { time: '3h', alignment: 85 },
];

const driftEvents = [
  {
    id: 'drift-1',
    time: '2h 15m',
    type: 'feature_creep',
    description: 'Agent started implementing user profiles',
    severity: 'medium',
    originalScope: 'Payment API only',
  },
  {
    id: 'drift-2',
    time: '2h 45m',
    type: 'security_forgotten',
    description: 'PCI compliance requirements not being checked',
    severity: 'critical',
    originalScope: 'PCI compliance required',
  },
];

export function DriftDetector() {
  const [currentAlignment, setCurrentAlignment] = useState(85);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-amber-500" />
            Intent Drift Monitor
          </CardTitle>
          <Badge className={
            currentAlignment >= 90 ? 'bg-emerald-500/20 text-emerald-400' :
            currentAlignment >= 80 ? 'bg-amber-500/20 text-amber-400' :
            'bg-red-500/20 text-red-400'
          }>
            {currentAlignment}% aligned
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={driftData}>
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={12}
                domain={[0, 100]}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #1e293b',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Line 
                type="monotone" 
                dataKey="alignment" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-400">Recent Drift Events</h4>
          {driftEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-3 rounded-lg border ${
                event.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' :
                'border-amber-500/30 bg-amber-500/5'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    event.severity === 'critical' ? 'text-red-500' : 'text-amber-500'
                  }`} />
                  <span className="text-xs text-slate-500">{event.time}</span>
                </div>
                <Badge className={
                  event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                  'bg-amber-500/20 text-amber-400'
                }>
                  {event.type}
                </Badge>
              </div>
              <p className="text-sm text-slate-300 mb-2">{event.description}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Target className="w-3 h-3" />
                <span>Original: {event.originalScope}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Button className="w-full mt-4" variant="outline">
          Review Session Intent
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
