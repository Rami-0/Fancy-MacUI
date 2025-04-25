// app/api/wakatime/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Cache configuration
const CACHE_MAX_AGE = 86400; // Cache for 24 hours (in seconds)

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://wakatime.com/badge/user/aa09bb25-ed24-4cf1-87b4-ae8c509c9d98.svg', {
      method: 'GET',
      headers: {
        'Content-Type': 'image/svg+xml',
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0',
      },
      cache: 'no-cache',
      next: { revalidate: CACHE_MAX_AGE }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch SVG: ${response.status} ${response.statusText}`);
    }

    const svgText = await response.text();
    
    // Improved regex pattern to handle different formats
    const match = svgText.match(/<text[^>]*>(\d+) hrs? (?:(\d+) mins?)?<\/text>/);

    if (match) {
      // Extract hours and minutes
      const hours = parseInt(match[1], 10) || 0;
      const minutes = match[2] ? parseInt(match[2], 10) : 0;
      const totalMinutes = hours * 60 + minutes;
      
      return NextResponse.json(
        { 
          hours,
          minutes,
          totalMinutes,
          timestamp: Date.now()
        }, 
        { 
          status: 200,
          headers: {
            'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}`,
            'CDN-Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
            'Vercel-CDN-Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
          }
        }
      );
    } else {
      throw new Error('Time value not found in SVG');
    }
  } catch (error) {
    console.error('WakaTime API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch time spent' },
      { status: 500 },
    );
  }
}
