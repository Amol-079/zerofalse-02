'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Users, Brain, ShieldAlert } from 'lucide-react';

const problems = [
  {
    icon: Users,
    title: 'Agent-to-Agent Confusion',
    description: 'When Claude Code delegates to a bash agent, vulnerabilities happen in the delegation, not the code. Intent gaps between agents create security holes.',
  },
  {
    icon: Brain,
    title: 'MCP Injection Attacks',
    description: 'MCP is the new HTTP for AI agents—and it is completely insecure. Attackers poison MCP servers, and every connecting AI gets malicious tool definitions.',
  },
  {
    icon: ShieldAlert,
    title: 'Multi-Agent Memory Pollution',
    description: 'AI agents share context across 5+ hour sessions. By hour 3, the context window is so polluted that agents forget original security requirements.',
  },
  {
    icon: AlertTriangle,
    title: 'Prompt Shadowing',
    description: 'The AI does something different from what the human asked, but the human never sees the intermediate steps to know. Admin bypasses go unnoticed.',
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Security Surface Has Moved
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Traditional security tools scan code. But in 2026, the vulnerability 
            is not in the code—it is in the intent chain between agents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-red-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <problem.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                <p className="text-slate-400 leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-slate-900/30 border border-slate-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Old World (2024)
              </h4>
              <div className="space-y-3">
                {[
                  'Human writes prompt',
                  'AI generates code',
                  'Security scanner finds vulnerabilities',
                  'Human reviews and fixes',
                ].map((step, i) => (
                  
                  <div key={i} className="flex items-center gap-3 text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                      {i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />
              <h4 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
                New World (2026)
              </h4>
              <div className="space-y-3">
                {[
                  'Human gives high-level goal',
                  'AI agents orchestrate autonomously',
                  'Vulnerabilities in delegation chain',
                  'No human sees the intermediate steps',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">
                      {i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

