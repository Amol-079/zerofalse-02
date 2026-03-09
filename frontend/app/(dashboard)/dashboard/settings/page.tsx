'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    autoBlock: true,
    notifyOnViolation: true,
    strictMode: false,
    auditLog: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure your Zerofalse security policies</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-2xl">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Security Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Auto-block violations</h4>
                <p className="text-sm text-slate-400">Automatically block suspicious agent actions</p>
              </div>
              <Switch 
                checked={settings.autoBlock}
                onCheckedChange={(checked) => setSettings({...settings, autoBlock: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Notify on violations</h4>
                <p className="text-sm text-slate-400">Send alerts when security violations are detected</p>
              </div>
              <Switch 
                checked={settings.notifyOnViolation}
                onCheckedChange={(checked) => setSettings({...settings, notifyOnViolation: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Strict mode</h4>
                <p className="text-sm text-slate-400">Require manual approval for all delegations</p>
              </div>
              <Switch 
                checked={settings.strictMode}
                onCheckedChange={(checked) => setSettings({...settings, strictMode: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Audit logging</h4>
                <p className="text-sm text-slate-400">Keep detailed logs of all agent activities</p>
              </div>
              <Switch 
                checked={settings.auditLog}
                onCheckedChange={(checked) => setSettings({...settings, auditLog: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Production API Key</span>
                <Button size="sm" variant="outline" className="h-8 border-slate-700">
                  Copy
                </Button>
              </div>
              <code className="text-sm text-slate-300 font-mono">
                zf_live_••••••••••••••••••••••••
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
