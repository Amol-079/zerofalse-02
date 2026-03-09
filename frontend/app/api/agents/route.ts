import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/agents`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    // Return demo data if backend unavailable
    return NextResponse.json({
      success: true,
      data: [
        {
          id: '1',
          name: 'Planner Agent',
          type: 'planner',
          capabilities: ['architecture', 'planning', 'delegation'],
          status: 'active',
          lastSeen: new Date().toISOString(),
          metadata: {},
        },
        {
          id: '2',
          name: 'Coder Agent',
          type: 'coder',
          capabilities: ['typescript', 'api_development', 'database'],
          status: 'active',
          lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          metadata: {},
        },
      ],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${process.env.BACKEND_URL}/api/agents/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}
