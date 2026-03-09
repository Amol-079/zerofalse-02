"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>Now supporting MCP Protocol 1.0</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Don't Scan AI Code.</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Verify AI Intent.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Zerofalse is the Intent Verification Protocol for AI agent teams.
          We join your autonomous AI coding agents as a security teammate,
          ensuring what your AI agents do matches what you intended.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-lg group">
              Start Protecting Your Agents
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 h-14 px-8 text-lg">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Shield, value: '2.4M+', label: 'Intent Violations Blocked' },
            { icon: Activity, value: '99.9%', label: 'Delegation Accuracy' },
            { icon: Zap, value: '<50ms', label: 'Verification Latency' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="w-6 h-6 text-blue-500 mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Agent Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {['Human Intent', 'Zerofalse', 'Agent A', 'Agent B', 'Agent C'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`relative p-4 rounded-xl border ${
                    i === 1
                      ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="text-sm font-semibold text-white text-center">{step}</div>
                  {i === 1 && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-slate-500">
              Real-time intent verification across agent delegation chains
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
