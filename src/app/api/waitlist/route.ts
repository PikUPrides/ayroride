import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("WAITLIST API RECEIVED BODY:", body); // Debug log

        const { email, name, phone, userType } = body;

        if (!email || !name) {
            console.log("Missing email or name");
            return NextResponse.json(
                { error: 'Name and email are required.' },
                { status: 400 }
            );
        }

        // ReferralHero API Configuration
        const RH_API_KEY = process.env.REFERRALHERO_API_KEY;
        // const CAMPAIGN_UUID = 'MF2f0c6063df'; // UUID is generally safe to be public or hardcoded as it's often in client-side widgets, but cleaner in env.
        // Actually, let's put UUID in env too for consistency.
        const RH_UUID = process.env.REFERRALHERO_UUID || 'MF2f0c6063df';

        const RH_ENDPOINT = `https://app.referralhero.com/api/v2/lists/${RH_UUID}/subscribers`;

        const payload = {
            email,
            name,
            phone_number: phone,
            domain: 'https://ayrorides.com',
            extra_field: userType || 'Rider',
            tags: userType || 'Rider' // Also add as a tag to ensure visibility
        };

        console.log("SENDING TO REFERRALHERO:", payload); // Debug log

        const response = await fetch(RH_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RH_API_KEY}`
            },
            body: JSON.stringify(payload)
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
