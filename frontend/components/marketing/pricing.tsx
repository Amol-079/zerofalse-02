'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'For small teams getting started with AI agents',
    features: [
      'Up to 5 AI agents',
      '1,000 MCP calls/month',
      'Basic intent verification',
      'Email support',
      '7-day data retention',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$199',
    period: '/month',
    description: 'For growing teams with active AI agent workflows',
    features: [
      'Up to 25 AI agents',
      '50,000 MCP calls/month',
      'Advanced delegation validation',
      'Intent drift detection',
      'Memory firewall',
      'Priority support',
      '30-day data retention',
      'SSO authentication',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with mission-critical AI systems',
    features: [
      'Unlimited AI agents',
      'Unlimited MCP calls',
      'Custom security policies',
      'On-premise deployment',
      'Dedicated support',
      'Unlimited retention',
      'Advanced analytics',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start protecting your AI agent infrastructure today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              <Card className={`h-full flex flex-col ${
                plan.popular 
                  ? 'border-blue-500/50 bg-slate-900/80' 
                  : 'border-slate-800 bg-slate-900/50'
              }`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-400 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-300">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
