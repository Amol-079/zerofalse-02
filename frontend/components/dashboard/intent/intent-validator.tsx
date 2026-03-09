'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const validationChecks = [
  { id: 'check-1', name: 'Capability Match', status: 'pass', detail: 'Agent has required skills' },
  { id: 'check-2', name: 'Security Context', status: 'pass', detail: 'All security requirements preserved' },
  { id: 'check-3', name: 'Scope Validation', status: 'warning', detail: 'Task scope within original intent' },
  { id: 'check-4', name: 'Memory Integrity', status: 'pass', detail: 'No context pollution detected' },
  { id: 'check-5', name: 'Tool Authorization', status: 'pass', detail: 'All tools approved for this agent' },
];

export function IntentValidator() {
  const [isValidating, setIsValidating] = useState(false);

  const runValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
    }, 2000);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            Real-time Validation
          </CardTitle>
          <Button
            size="sm"
            onClick={runValidation}
            disabled={isValidating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isValidating ? 'Validating...' : 'Run Check'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {validationChecks.map((check, i) => (
            <motion.div
              key={check.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/30 border border-slate-800/50"
            >
              {check.status === 'pass' && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
              {check.status === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />}
              {check.status === 'fail' && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white text-sm">{check.name}</span>
                  <span className={`text-xs ${
                    check.status === 'pass' ? 'text-emerald-400' :
                    check.status === 'warning' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {check.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{check.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="font-medium text-emerald-400">Validation Passed</span>
          </div>
          <p className="text-sm text-slate-400">
            All critical checks passed. This delegation is safe to proceed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
