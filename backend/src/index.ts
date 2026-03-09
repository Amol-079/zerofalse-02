// backend/src/index.ts
import { createServer } from './api/server';
import { createWebSocketServer } from './websocket/server';
import { MCPProxyServer } from './mcp/proxy-server';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3001;
const WS_PORT = process.env.WS_PORT || 3002;
const MCP_PORT = process.env.MCP_PORT || 3003;

async function bootstrap() {
  try {
    // Start HTTP API Server
    const app = createServer();
    app.listen(PORT, () => {
      logger.info(`🚀 API Server running on port ${PORT}`);
    });

    // Start WebSocket Server for real-time updates
    const wsServer = createWebSocketServer();
    wsServer.listen(WS_PORT, () => {
      logger.info(`🔌 WebSocket Server running on port ${WS_PORT}`);
    });

    // Start MCP Proxy Server
    const mcpProxy = new MCPProxyServer();
    await mcpProxy.start(MCP_PORT);
    logger.info(`🛡️  MCP Proxy Server running on port ${MCP_PORT}`);

    logger.info('✅ Zerofalse Backend initialized successfully');
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
