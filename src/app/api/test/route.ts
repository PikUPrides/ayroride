import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'success',
        message: 'Deployment test successful!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        hasReferralHeroKey: !!process.env.REFERRALHERO_API_KEY,
        hasReferralHeroUUID: !!process.env.REFERRALHERO_UUID
    });
}
