'use client';

import { motion } from 'framer-motion';
import { 
  Target, Filter, ShieldCheck, Activity, 
  ArrowRight, CheckCircle 
} from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Intent Capture',
    description: 'Zerofalse captures the original human intent, parsing security requirements, constraints, and non-negotiables.',
    color: 'blue',
  },
  {
    icon: Filter,
    title: 'Interception Layer',
    description: 'Every agent delegation, MCP tool call, and memory access passes through Zerofalse for real-time validation.',
    color: 'purple',
  },
  {
    icon: ShieldCheck,
    title: 'Verification Engine',
    description: 'Our engine checks for capability mismatches, intent drift, security gaps, and memory pollution in milliseconds.',
    color: 'pink',
  },
  {
    icon: Activity,
    title: 'Continuous Monitoring',
    description: 'Long-running sessions are monitored for drift. Security context is protected across the entire agent chain.',
    color: 'emerald',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How Zerofalse Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive intent verification protocol that sits between 
            your AI agents and their execution environment.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className={`w-14 h-14 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center mb-6`}>
                    <step.icon className={`w-7 h-7 text-${step.color}-500`} />
                  </div>
                  <div className="text-sm font-medium text-slate-500 mb-2">Step {i + 1}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl bg-slate-900/30 border border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold text-white mb-2">Human Intent</h4>
              <p className="text-sm text-slate-400">High-level goals and security requirements</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center">
                <ShieldCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Zerofalse</div>
                <div className="text-sm opacity-90">Intent Verification Protocol</div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <h4 className="text-lg font-semibold text-white mb-2">AI Agent Team</h4>
              <p className="text-sm text-slate-400">Orchestrated, secure execution</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
