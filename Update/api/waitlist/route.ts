import { NextResponse } from 'next/server';
import dns from 'node:dns';

// Force IPv4 ordering to avoid IPv6 connection timeouts (common in some local envs)
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (e) {
    console.warn('Could not set DNS result order:', e);
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
        const UUID = process.env.REFERRALHERO_UUID; // "MF2f0c6063df" as per user, presumably in env

        if (!API_KEY || !UUID) {
            console.error('ReferralHero credentials missing in environment variables.');
            return NextResponse.json(
                { error: 'Server configuration error.' },
                { status: 500 }
            );
        }

        // Send data to ReferralHero API
        // Endpoint: https://app.referralhero.com/api/v2/lists/{list_id}/subscribers
        // API Key must be sent in the Authorization header (Bearer token) or X-API-Key header

        // Build payload - only include phone if it's provided and valid
        const payload: any = {
            email: email,
            name: name,
            extra_field: zipCode,
            extra_field_2: userType
        };

        // TODO: Add phone number validation
        // ReferralHero validates US phone numbers strictly
        // For now, skipping phone to test the rest of the integration
        // if (phone && phone.replace(/\D/g, '').length >= 10) {
        //     payload.phone_number = phone;
        // }

        console.log('Sending to ReferralHero:', payload);

        const rhResponse = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}` // Send API Key in Header
            },
            body: JSON.stringify(payload),
        });

        const rhData = await rhResponse.json();

        if (!rhResponse.ok || rhData.status === 'error') {
            console.error('ReferralHero API Error:', rhData);
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
