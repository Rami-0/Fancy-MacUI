// app/api/wakatime/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://wakatime.com/badge/user/aa09bb25-ed24-4cf1-87b4-ae8c509c9d98.svg', {
      method: 'GET',
      headers: {
        'Content-Type': 'image/svg+xml',
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch SVG');
    }

    const svgText = await response.text();
    const match = svgText.match(/<text[^>]*>(\d+) hrs (\d+) mins<\/text>/);

    if (match && match[1]) {
      // Extract only the hours as a number
      const hours = parseInt(match[1], 10);
      return NextResponse.json({ hours }, { status: 200 });
    } else {
      throw new Error('Time value not found in SVG');
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch time spent' },
      { status: 500 },
    );
  }
}
