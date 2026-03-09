'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary-glow))] opacity-20" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            AI Agents Are Writing Code Right Now
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Join 50+ teams using Zerofalse to secure their AI agent teams. 
            Block vulnerabilities before they're written.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2 text-lg px-8">
                Start Free — Install MCP Server
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Schedule Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-text-muted">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
