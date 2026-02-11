import { NextResponse } from 'next/server';
import dns from 'node:dns';

// Force IPv4 ordering to avoid IPv6 connection timeouts (common in some local envs)
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (e) {
    console.warn('Could not set DNS result order:', e);
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { subscriberId, name, email, zipCode, userType } = body;

        if (!subscriberId || !name || !email) {
            return NextResponse.json(
                { error: 'Subscriber ID, name, and email are required.' },
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

        const payload: any = {
            email: email,
            name: name,
            extra_field: zipCode,
            extra_field_2: userType
        };

        console.log('Updating ReferralHero subscriber:', subscriberId, payload);

        const rhResponse = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers/${subscriberId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload),
        });

        const rhData = await rhResponse.json();

        if (!rhResponse.ok || rhData.status === 'error') {
            console.error('ReferralHero Update API Error:', rhData);
            throw new Error(rhData.message || 'Failed to update subscriber.');
        }

        return NextResponse.json(
            { message: 'Successfully updated your information!', data: rhData },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Waitlist Update API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to update information.',
                details: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, zipCode, userType } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required.' },
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

        const payload: any = {
            email: email,
            name: name,
            extra_field: zipCode,
            extra_field_2: userType
        };

        // Note: Phone number is collected but not sent to ReferralHero due to strict formatting requirements.
        // Uncomment below to enable if implementing compatible validation.
        /*
        if (phone && phone.replace(/\D/g, '').length >= 10) {
            payload.phone_number = phone;
        }
        */

        console.log('Sending to ReferralHero:', payload);

        const rhResponse = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload),
        });

        const rhData = await rhResponse.json();

        if (!rhResponse.ok || rhData.status === 'error') {
            console.error('ReferralHero API Error:', rhData);

            // Check if it's a duplicate email error
            if (rhData.message && rhData.message.toLowerCase().includes('already') ||
                rhData.message && rhData.message.toLowerCase().includes('exists') ||
                rhData.message && rhData.message.toLowerCase().includes('duplicate')) {

                // Try to fetch the existing subscriber
                try {
                    const fetchResponse = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers?email=${encodeURIComponent(email)}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${API_KEY}`
                        }
                    });

                    const fetchData = await fetchResponse.json();

                    if (fetchResponse.ok && fetchData.data && fetchData.data.length > 0) {
                        const subscriber = fetchData.data[0];
                        return NextResponse.json(
                            {
                                error: 'already_exists',
                                message: 'You are already on the waitlist!',
                                subscriber: {
                                    id: subscriber.id,
                                    email: subscriber.email,
                                    name: subscriber.name,
                                    zipCode: subscriber.extra_field,
                                    userType: subscriber.extra_field_2,
                                    confirmed: subscriber.confirmed
                                }
                            },
                            { status: 409 }
                        );
                    }
                } catch (fetchError) {
                    console.error('Failed to fetch existing subscriber:', fetchError);
                }
            }

            throw new Error(rhData.message || 'Failed to register with ReferralHero.');
        }

        return NextResponse.json(
            { message: 'Successfully joined waitlist!', data: rhData },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to join waitlist.',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
