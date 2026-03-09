'use client';

import { motion } from 'framer-motion';
import { Bot, Activity, ShieldAlert, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    title: 'Active Agents',
    value: '12',
    change: '+3',
    changeType: 'positive',
    icon: Bot,
    color: 'blue',
  },
  {
    title: 'Active Sessions',
    value: '5',
    change: '+1',
    changeType: 'positive',
    icon: Activity,
    color: 'purple',
  },
  {
    title: 'Violations Blocked',
    value: '1,284',
    change: '+42',
    changeType: 'positive',
    icon: ShieldAlert,
    color: 'red',
  },
  {
    title: 'Intent Alignment',
    value: '98.5%',
    change: '+2.1%',
    changeType: 'positive',
    icon: Target,
    color: 'emerald',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.change} from last hour
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
