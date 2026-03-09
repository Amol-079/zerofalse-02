'use client';

import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [notifications] = useState(3);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search agents, sessions, violations..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-800">
            <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <div className="max-h-64 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <span className="text-sm text-white">Intent violation detected</span>
                <span className="text-xs text-slate-400">Agent B attempted to override encryption requirement</span>
                <span className="text-xs text-slate-500 mt-1">2 minutes ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <span className="text-sm text-white">MCP tool call blocked</span>
                <span className="text-xs text-slate-400">Unauthorized file system access attempted</span>
                <span className="text-xs text-slate-500 mt-1">15 minutes ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <span className="text-sm text-white">Session drift detected</span>
                <span className="text-xs text-slate-400">Feature creep identified in payment API session</span>
                <span className="text-xs text-slate-500 mt-1">1 hour ago</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-slate-300 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">Demo User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-800">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-800">
              Organization
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-800">
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-slate-800">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
