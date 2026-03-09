import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
    case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-emerald-500 bg-emerald-500/10';
    case 'blocked': return 'text-red-500 bg-red-500/10';
    case 'pending': return 'text-amber-500 bg-amber-500/10';
    case 'verified': return 'text-blue-500 bg-blue-500/10';
    case 'completed': return 'text-gray-500 bg-gray-500/10';
    default: return 'text-gray-500 bg-gray-500/10';
  }
}
