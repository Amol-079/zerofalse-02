import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId');
  
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/drift/detect/${sessionId}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Drift detection failed' },
      { status: 500 }
    );
  }
}
