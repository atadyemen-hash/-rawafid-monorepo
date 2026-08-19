import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { task, data } = body;

    const SIRAJ_KEY = process.env.NEXT_PUBLIC_SIRAJ_SECRET_MASTER_KEY;
    if (!SIRAJ_KEY) {
      return NextResponse.json({ error: 'SIRAJ_KEY missing' }, { status: 500 });
    }

    const sirajResponse = await fetch('https://api.siraj.ai/v1/orchestrate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SIRAJ_KEY}`
      },
      body: JSON.stringify({ task, data })
    });

    const result = await sirajResponse.json();
    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Orchestrator failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Orchestrator V2 is running' });
}
