import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Forward to backend MCP proxy
    const response = await fetch(`${process.env.BACKEND_URL}/api/mcp/intercept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: 'MCP interception failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/mcp/policies`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch policies' },
      { status: 500 }
    );
  }
}
