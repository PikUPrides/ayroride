import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, phone } = body;

        if (!email || !name) {
            return NextResponse.json(
                { error: 'Name and email are required.' },
                { status: 400 }
            );
        }

        // ReferralHero API Configuration
        const RH_API_KEY = '2b684fdeb10b5615ea4fb2c5ef71c3f3c5590e1b';
        const CAMPAIGN_UUID = 'MF2f0c6063df';
        const RH_ENDPOINT = `https://app.referralhero.com/api/v2/lists/${CAMPAIGN_UUID}/subscribers`;

        const response = await fetch(RH_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RH_API_KEY}`
            },
            body: JSON.stringify({
                email,
                name,
                phone_number: phone, // Mapping phone to ReferralHero field
                domain: 'https://pikup.us' // Optional: Helps tracking source
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('ReferralHero Error:', data);
            return NextResponse.json(
                { error: data.message || 'Failed to join waitlist.', details: data },
                { status: response.status }
            );
        }

        return NextResponse.json(
            { message: 'Successfully joined waitlist!', data },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
