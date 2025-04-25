// app/api/wakatime/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Cache configuration
const CACHE_KEY = 'wakatime_stats';
const CACHE_MAX_AGE = 86400; // Cache for 24 hours (in seconds)

// Interface for cached data
interface WakaTimeData {
  hours: number;
  minutes: number;
  totalMinutes: number;
  timestamp: number;
}

export async function GET(request: NextRequest) {
  try {
    // Try to get data from Vercel KV store first (app-level cache)
    let cachedData: WakaTimeData | null = null;
    
    try {
      if (kv) {
        // If Vercel KV is available, use it for app-level caching
        cachedData = await kv.get<WakaTimeData>(CACHE_KEY);
      }
    } catch (kvError) {
      // If KV access fails, log the error but continue with the request
      console.warn('Failed to access Vercel KV:', kvError);
    }
    
    const now = Date.now();
    
    // Check if we have valid cached data
    if (cachedData && (now - cachedData.timestamp) / 1000 < CACHE_MAX_AGE) {
      return NextResponse.json(
        { 
          ...cachedData,
          cached: true 
        }, 
        { 
          status: 200,
          headers: {
            // Set cache headers for CDN and browser caching
            'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}`,
            'CDN-Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
            'Vercel-CDN-Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
          }
        }
      );
    }

    // If no valid cache, fetch fresh data
    const response = await fetch('https://wakatime.com/badge/user/aa09bb25-ed24-4cf1-87b4-ae8c509c9d98.svg', {
      method: 'GET',
      headers: {
        'Content-Type': 'image/svg+xml',
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0',
      },
      // Ensure we're not using a cached response
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
      
      // Create new data object
      const newData: WakaTimeData = {
        hours,
        minutes,
        totalMinutes,
        timestamp: now
      };
      
      // Update cache in Vercel KV if available
      try {
        if (kv) {
          await kv.set(CACHE_KEY, newData, { ex: CACHE_MAX_AGE });
        }
      } catch (kvError) {
        console.warn('Failed to update Vercel KV cache:', kvError);
      }
      
      return NextResponse.json(
        { 
          ...newData,
          cached: false 
        }, 
        { 
          status: 200,
          headers: {
            // Set cache headers for CDN and browser caching
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
    
    // Try to get stale data from Vercel KV
    try {
      if (kv) {
        const staleData = await kv.get<WakaTimeData>(CACHE_KEY);
        if (staleData) {
          return NextResponse.json(
            { 
              ...staleData,
              cached: true,
              stale: true,
              error: error instanceof Error ? error.message : 'Unknown error'
            }, 
            { 
              status: 200,
              headers: {
                'Cache-Control': 'no-cache',
              }
            }
          );
        }
      }
    } catch (kvError) {
      console.warn('Failed to access Vercel KV for stale data:', kvError);
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch time spent' },
      { status: 500 },
    );
  }
}
