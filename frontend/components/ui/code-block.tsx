'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={cn("rounded-lg overflow-hidden bg-slate-950 border border-slate-800", className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <span className="text-xs text-slate-400 ml-2">{filename}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}
      <div className="relative overflow-x-auto p-4">
        <pre className="text-sm font-mono leading-relaxed">
          <code className="text-slate-50">
            {lines.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell text-right pr-4 text-slate-600 select-none w-12">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell text-slate-300">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
