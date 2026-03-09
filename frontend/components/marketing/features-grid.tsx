'use client';

import { motion } from 'framer-motion';
import { Shield, GitBranch, Target, Brain, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'MCP Security Proxy',
    description: 'Intercept and validate every MCP tool call between agents. Block malicious tool definitions before they reach your AI.',
    color: 'blue',
    details: [
      'Real-time tool call interception',
      'Policy-based validation engine',
      'Automatic threat neutralization',
      'Audit trail for all calls',
    ],
  },
  {
    icon: GitBranch,
    title: 'Agent Delegation Validator',
    description: 'Verify every handoff between agents. Ensure capabilities match requirements and security constraints are preserved.',
    color: 'purple',
    details: [
      'Capability mismatch detection',
      'Scope creep prevention',
      'Security requirement tracking',
      'Delegation chain verification',
    ],
  },
  {
    icon: Target,
    title: 'Intent Drift Detector',
    description: 'Monitor long-running agent sessions for deviation from original goals. Catch feature creep and forgotten security requirements.',
    color: 'pink',
    details: [
      'Real-time alignment scoring',
      'Automatic drift alerts',
      'Context window analysis',
      'Session health monitoring',
    ],
  },
  {
    icon: Brain,
    title: 'Cross-Agent Memory Firewall',
    description: 'Isolate sensitive security context between agents. Prevent malicious or accidental memory pollution.',
    color: 'emerald',
    details: [
      'Security context isolation',
      'Memory pollution detection',
      'Access control enforcement',
      'Secure memory segmentation',
    ],
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four Killer Features
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive protection for your AI agent infrastructure. 
            Not just scanning—true intent verification.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 group overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-${feature.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-500`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            View Technical Documentation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
