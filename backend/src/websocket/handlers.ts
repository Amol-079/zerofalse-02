import { Server } from 'socket.io';
import { 
  Agent, Delegation, Violation, MCPToolCall, 
  DriftEvent, MemoryPollution 
} from '../../../shared/types';

export function setupWebSocketHandlers(io: Server): void {
  io.on('connection', (socket) => {
    // Send initial connection confirmation
    socket.emit('connected', {
      timestamp: new Date().toISOString(),
      message: 'Connected to Zerofalse real-time monitoring',
    });

    // Handle agent status updates
    socket.on('agent_status_update', (agent: Agent) => {
      socket.broadcast.emit('agent_status', agent);
    });

    // Handle delegation events
    socket.on('delegation_event', (delegation: Delegation) => {
      io.to(`session:${delegation.originalIntent}`).emit('delegation', delegation);
    });

    // Handle violation events
    socket.on('violation_event', (violation: Violation) => {
      io.emit('violation', violation);
    });

    // Handle MCP tool calls
    socket.on('mcp_tool_call', (toolCall: MCPToolCall) => {
      io.to(`session:${toolCall.sessionId}`).emit('tool_call', toolCall);
    });

    // Handle drift events
    socket.on('drift_event', (event: DriftEvent) => {
      io.to(`session:${event.sessionId}`).emit('drift', event);
    });

    // Handle memory alerts
    socket.on('memory_alert_event', (alert: MemoryPollution) => {
      io.to(`session:${alert.sessionId}`).emit('memory_alert', alert);
    });

    // Handle ping for keepalive
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: Date.now() });
    });
  });
}

// Broadcast helpers
export function broadcastAgentStatus(io: Server, agent: Agent): void {
  io.emit('agent_status', agent);
}

export function broadcastDelegation(io: Server, delegation: Delegation): void {
  io.emit('delegation', delegation);
}

export function broadcastViolation(io: Server, violation: Violation): void {
  io.emit('violation', violation);
}

export function broadcastToolCall(io: Server, toolCall: MCPToolCall): void {
  io.emit('tool_call', toolCall);
}

export function broadcastDrift(io: Server, event: DriftEvent): void {
  io.emit('drift', event);
}

export function broadcastMemoryAlert(io: Server, alert: MemoryPollution): void {
  io.emit('memory_alert', alert);
}
