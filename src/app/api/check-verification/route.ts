import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://app.referralhero.com/api/v2/lists/${process.env.REFERRAL_HERO_UUID}/subscribers/retrieve_by_email?email=${encodeURIComponent(email)}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REFERRAL_HERO_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            // If subscriber not found or not verified, API returns error
            return NextResponse.json({ verified: false, exists: false });
        }

        const data = await response.json();

        // Check if subscriber is verified
        return NextResponse.json({
            verified: data.verified || false,
            exists: true,
            subscriber: data
        });
    } catch (error) {
        console.error('Error checking verification:', error);
        return NextResponse.json({ error: 'Failed to check verification status' }, { status: 500 });
    }
}
