import { Express, Request, Response } from 'express';
import { mcpProxy, agentRegistry, intentEngine } from '../server';

export function setupRoutes(app: Express) {
  // Health check
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // MCP Routes
  app.post('/api/mcp/intercept', async (req: Request, res: Response) => {
    try {
      const result = await mcpProxy.intercept(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/mcp/policies', (req: Request, res: Response) => {
    res.json({ success: true, data: mcpProxy.getPolicies() });
  });

  // Agent Routes
  app.get('/api/agents', (req: Request, res: Response) => {
    res.json({ success: true, data: agentRegistry.getAllAgents() });
  });

  app.post('/api/agents/validate', async (req: Request, res: Response) => {
    try {
      const result = await agentRegistry.validateDelegation(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Intent Routes
  app.post('/api/intent/validate', async (req: Request, res: Response) => {
    try {
      const result = await intentEngine.validate(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/intent/analyze/:sessionId', async (req: Request, res: Response) => {
    try {
      const result = await intentEngine.analyze(req.params.sessionId);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Drift Detection
  app.get('/api/drift/detect/:sessionId', async (req: Request, res: Response) => {
    try {
      const result = await intentEngine.detectDrift(req.params.sessionId);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
