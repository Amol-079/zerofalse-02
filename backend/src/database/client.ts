import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper functions for common operations
export async function createSession(userId: string, name: string) {
  return prisma.session.create({
    data: {
      userId,
      name,
      status: 'active',
    },
  });
}

export async function updateSessionStatus(sessionId: string, status: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { status },
  });
}

export async function logViolation(violationData: {
  sessionId?: string;
  type: string;
  severity: string;
  description: string;
  agentId?: string;
}) {
  return prisma.violation.create({
    data: {
      ...violationData,
      timestamp: new Date(),
    },
  });
}

export async function logToolCall(toolCallData: {
  sessionId?: string;
  agentId: string;
  tool: string;
  params: any;
  status: string;
  reason?: string;
}) {
  return prisma.mCPToolCall.create({
    data: {
      ...toolCallData,
      timestamp: new Date(),
    },
  });
}

export async function getSessionStats(sessionId: string) {
  const [violations, toolCalls, agents] = await Promise.all([
    prisma.violation.count({ where: { sessionId } }),
    prisma.mCPToolCall.count({ where: { sessionId } }),
    prisma.agent.count({ where: { sessionId } }),
  ]);

  return {
    violations,
    toolCalls,
    agents,
  };
}
