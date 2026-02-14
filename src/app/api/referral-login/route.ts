import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required.' },
                { status: 400 }
            );
        }

        const API_KEY = process.env.REFERRALHERO_API_KEY;
        const UUID = process.env.REFERRALHERO_UUID;

        if (!API_KEY || !UUID) {
            console.error('ReferralHero credentials missing in environment variables.');
            return NextResponse.json(
                { error: 'Server configuration error.' },
                { status: 500 }
            );
        }

        // Try to retrieve subscriber by email directly
        console.log('Looking up subscriber by email:', email);
        const response = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers/retrieve_by_email?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        const data = await response.json();

        if (response.ok && data.data) {
            console.log('Subscriber found:', data.data.id);
            return NextResponse.json(
                {
                    message: 'Subscriber found',
                    subscriberId: data.data.id,
                    verified: data.data.verified || false
                },
                { status: 200 }
            );
        } else if (data.code === 'subscriber_not_found') {
            // Subscriber doesn't exist or is unverified
            console.log('Subscriber not found or unverified:', email);
            return NextResponse.json(
                { error: 'Email not found or not verified. Please join the waitlist or check your email for the verification link.' },
                { status: 404 }
            );
        } else {
            console.error('ReferralHero API Error:', data);
            return NextResponse.json(
                { error: 'Failed to look up email.' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('Referral Login API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to access referral dashboard.',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
