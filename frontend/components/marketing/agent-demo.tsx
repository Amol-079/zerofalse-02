'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Shield, AlertCircle, CheckCircle, 
  ArrowRight, Terminal, Lock, Unlock, Target
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type DemoStep = {
  id: number;
  agent: string;
  action: string;
  intent: string;
  status: 'pending' | 'verifying' | 'blocked' | 'allowed';
  details: string;
};

const demoSteps: DemoStep[] = [
  {
    id: 1,
    agent: 'Planner Agent',
    action: 'Delegate: Implement authentication',
    intent: 'Build secure payment API with PCI compliance',
    status: 'allowed',
    details: '✓ Capability verified. Security requirements preserved.',
  },
  {
    id: 2,
    agent: 'Coder Agent',
    action: 'Use jwt.verify(token, process.env.SECRET)',
    intent: 'Secure JWT implementation',
    status: 'blocked',
    details: '⚠️ BLOCKED: process.env.SECRET undefined in production. Suggest: Use secrets manager.',
  },
  {
    id: 3,
    agent: 'Bash Agent',
    action: 'Execute: curl https://api.example.com | sh',
    intent: 'Install dependencies',
    status: 'blocked',
    details: '⛔ BLOCKED: Pipe to shell violates security policy. Suggest: Download, verify checksum, then execute.',
  },
  {
    id: 4,
    agent: 'Deploy Agent',
    action: 'Deploy to production',
    intent: 'Secure deployment',
    status: 'allowed',
    details: '✓ All security checks passed. Deployment authorized.',
  },
];

export function AgentDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demoSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        setCompletedSteps((c) => [...c, prev]);
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'allowed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'verifying':
        return <Shield className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked':
        return 'border-red-500/50 bg-red-500/5';
      case 'allowed':
        return 'border-emerald-500/50 bg-emerald-500/5';
      case 'verifying':
        return 'border-blue-500/50 bg-blue-500/5';
      default:
        return 'border-slate-700 bg-slate-800/50';
    }
  };

  return (
    <section id="demo" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-slate-400">
            Watch Zerofalse intercept and validate agent delegations in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Intent Input */}
          <Card className="bg-slate-950/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-white">Original Intent</h3>
              </div>
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-sm text-slate-300">
                  "Build a secure payment processing API with PCI compliance, 
                  JWT authentication, and encrypted data storage."
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                  PCI Compliance
                </Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  JWT Auth
                </Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                  Encryption
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Agent Chain */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">
              {demoSteps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = completedSteps.includes(index) || index < currentStep;
                
                if (!isActive && !isCompleted && index > currentStep) return null;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`relative p-4 rounded-xl border transition-all ${
                      isActive 
                        ? getStatusColor(step.status) 
                        : 'border-slate-800 bg-slate-900/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        step.status === 'blocked' ? 'bg-red-500/10' : 
                        step.status === 'allowed' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
                      }`}>
                        {step.status === 'blocked' ? <Lock className="w-5 h-5 text-red-500" /> :
                         step.status === 'allowed' ? <Unlock className="w-5 h-5 text-emerald-500" /> :
                         <Bot className="w-5 h-5 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-white">{step.agent}</span>
                          {getStatusIcon(step.status)}
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{step.action}</p>
                        {(isActive || isCompleted) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`text-sm p-3 rounded-lg ${
                              step.status === 'blocked' 
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {step.details}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                {isPlaying ? 'Pause' : 'Play Demo'}
              </Button>
              <Button
                variant="outline"
                onClick={resetDemo}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-3 gap-6"
        >
          {[
            { label: 'Violations Blocked', value: '2', color: 'text-red-400' },
            { label: 'Delegations Verified', value: '2', color: 'text-emerald-400' },
            { label: 'Response Time', value: '<50ms', color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-slate-950/50 border border-slate-800">
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
