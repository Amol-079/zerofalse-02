import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupRoutes } from './api/routes';
import { setupWebSocketHandlers } from './websocket/handlers';
import { MCPProxyServer } from './mcp/proxy-server';
import { AgentRegistry } from './agents/agent-registry';
import { IntentEngine } from './intent/intent-parser';
import { MemoryFirewall } from './memory/context-isolator';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize core services
export const mcpProxy = new MCPProxyServer();
export const agentRegistry = new AgentRegistry();
export const intentEngine = new IntentEngine();
export const memoryFirewall = new MemoryFirewall();

// Setup routes
setupRoutes(app);

// Setup WebSocket handlers
setupWebSocketHandlers(io);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Zerofalse Backend running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
  console.log(`🔒 MCP Proxy initialized`);
});

export { io };
