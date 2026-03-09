import { MemoryContext } from '../../../shared/types';

export class SecureMemoryStore {
  private store: Map<string, MemoryContext> = new Map();
  private encryptionKey: string;

  constructor() {
    // In production, use proper key management
    this.encryptionKey = process.env.MEMORY_ENCRYPTION_KEY || 'demo-key';
  }

  store(context: MemoryContext): void {
    // Encrypt sensitive contexts before storing
    if (context.securityLevel === 'critical' || context.securityLevel === 'high') {
      const encrypted = this.encrypt(context.content);
      this.store.set(context.id, {
        ...context,
        content: encrypted,
      });
    } else {
      this.store.set(context.id, context);
    }
  }

  retrieve(id: string): MemoryContext | undefined {
    const context = this.store.get(id);
    
    if (!context) {
      return undefined;
    }

    // Decrypt if needed
    if (context.securityLevel === 'critical' || context.securityLevel === 'high') {
      return {
        ...context,
        content: this.decrypt(context.content),
      };
    }

    return context;
  }

  delete(id: string): void {
    this.store.delete(id);
  }

  clear(): void {
    this.store.clear();
  }

  private encrypt(content: string): string {
    // In production, use AES-256-GCM
    // This is a placeholder implementation
    return `encrypted:${Buffer.from(content).toString('base64')}`;
  }

  private decrypt(encrypted: string): string {
    if (encrypted.startsWith('encrypted:')) {
      const base64 = encrypted.replace('encrypted:', '');
      return Buffer.from(base64, 'base64').toString('utf8');
    }
    return encrypted;
  }

  getStats(): MemoryStats {
    const all = Array.from(this.store.values());
    
    return {
      total: all.length,
      critical: all.filter(c => c.securityLevel === 'critical').length,
      high: all.filter(c => c.securityLevel === 'high').length,
      normal: all.filter(c => c.securityLevel === 'normal').length,
      isolated: all.filter(c => c.isolated).length,
    };
  }
}

interface MemoryStats {
  total: number;
  critical: number;
  high: number;
  normal: number;
  isolated: number;
}
