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
        const { subscriberId, name, email, phone, zipCode, userType } = body;

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

        // Format phone to international format with spaces: +1 XXX XXX XXXX
        let formattedPhone = '';
        if (phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.length === 10) {
                // Format as +1 XXX XXX XXXX
                formattedPhone = `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            } else if (digits.length === 11 && digits.startsWith('1')) {
                const usDigits = digits.substring(1);
                formattedPhone = `+1 ${usDigits.slice(0, 3)} ${usDigits.slice(3, 6)} ${usDigits.slice(6)}`;
            }
        }

        const payload: any = {
            email: email,
            name: name,
            extra_field: zipCode,
            extra_field_2: userType,
            extra_field_3: 'AYRO_WAITLIST_MEMBER', // Preserve hidden marker when updating
            double_optin: true
        };

        if (formattedPhone) {
            payload.phone_number = formattedPhone;
        }

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
            {
                message: 'Successfully updated your information!',
                data: rhData,
                subscriberId: subscriberId // Return subscriber ID for verification flow
            },
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

        // Format phone to international format with spaces: +1 XXX XXX XXXX
        let formattedPhone = '';
        if (phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.length === 10) {
                // Format as +1 XXX XXX XXXX
                formattedPhone = `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            } else if (digits.length === 11 && digits.startsWith('1')) {
                const usDigits = digits.substring(1);
                formattedPhone = `+1 ${usDigits.slice(0, 3)} ${usDigits.slice(3, 6)} ${usDigits.slice(6)}`;
            }
        }

        const payload: any = {
            email: email,
            name: name,
            extra_field: zipCode,
            extra_field_2: userType,
            extra_field_3: 'AYRO_WAITLIST_MEMBER', // Hidden marker to identify real subscribers
            double_optin: true
        };

        // Enable phone for creation with international format
        // Only add phone if it's valid and formatted
        if (formattedPhone && formattedPhone.length >= 12) {
            payload.phone_number = formattedPhone;
        } else if (phone) {
            console.warn('Phone number not formatted correctly, skipping:', phone);
        }

        // Check if subscriber already exists BEFORE creating
        console.log('Checking for existing subscriber:', email);
        try {
            // Fetch all subscribers (not filtered by email) to ensure we get accurate results
            const checkResponse = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });

            const checkData = await checkResponse.json();
            console.log('Check response - Found subscribers:', checkData.data?.subscribers?.length || 0);

            if (checkResponse.ok && checkData.data && checkData.data.subscribers && checkData.data.subscribers.length > 0) {
                // Log all emails to debug
                console.log('Subscriber emails:', checkData.data.subscribers.map((s: any) => s.email));
                console.log('Looking for:', email);

                // Find the subscriber with matching email
                const subscriber = checkData.data.subscribers.find((sub: any) =>
                    sub.email?.toLowerCase() === email.toLowerCase()
                );

                if (!subscriber) {
                    console.log('No exact email match found in', checkData.data.subscribers.length, 'subscribers');
                } else {
                    console.log('Subscriber already exists:', subscriber.id);
                    console.log('Subscriber verified status:', subscriber.verified);

                    // Format phone for display
                    let displayPhone = '';
                    if (subscriber.phone_number) {
                        const phoneDigits = subscriber.phone_number.replace(/\D/g, '');
                        if (phoneDigits.length === 11 && phoneDigits.startsWith('1')) {
                            const usDigits = phoneDigits.substring(1);
                            displayPhone = `(${usDigits.slice(0, 3)}) ${usDigits.slice(3, 6)}-${usDigits.slice(6)}`;
                        } else if (phoneDigits.length === 10) {
                            displayPhone = `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
                        }
                    }

                    return NextResponse.json(
                        {
                            error: 'already_exists',
                            message: 'You are already on the waitlist!',
                            subscriber: {
                                id: subscriber.id,
                                email: subscriber.email,
                                name: subscriber.name,
                                phone: displayPhone,
                                zipCode: subscriber.extra_field,
                                userType: subscriber.extra_field_2,
                                confirmed: subscriber.verified
                            }
                        },
                        { status: 409 }
                    );
                }
            }
        } catch (checkError) {
            console.error('Error checking for existing subscriber:', checkError);
            // Continue with creation if check fails
        }

        console.log('Creating new subscriber:', payload);

        const rhResponse = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload),
        });

        const rhData = await rhResponse.json();

        console.log('=== REFERRALHERO CREATE DEBUG ===');
        console.log('HTTP Status:', rhResponse.status);
        console.log('Response Headers:', Object.fromEntries(rhResponse.headers.entries()));
        console.log('Full Response:', JSON.stringify(rhData, null, 2));
        console.log('Payload Sent:', JSON.stringify(payload, null, 2));
        console.log('=================================');

        if (!rhResponse.ok || rhData.status === 'error') {
            console.error('ReferralHero API Error:', rhData);
            throw new Error(rhData.message || 'Failed to register with ReferralHero.');
        }

        // Check if subscriber already existed (ReferralHero returns existing subscriber for duplicates)
        // If created_at is more than 5 seconds old, it's an existing subscriber
        if (rhData.data && rhData.data.created_at) {
            const createdAt = rhData.data.created_at;
            const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
            const ageInSeconds = now - createdAt;

            console.log('Subscriber age:', ageInSeconds, 'seconds');

            if (ageInSeconds > 5) {
                // This is an existing subscriber (created more than 5 seconds ago)
                console.log('Existing subscriber detected:', rhData.data.id);
                console.log('Subscriber verified status:', rhData.data.verified);

                // Format phone for display (remove +1 and format as (XXX) XXX-XXXX)
                let displayPhone = '';
                if (rhData.data.phone_number) {
                    const phoneDigits = rhData.data.phone_number.replace(/\D/g, '');
                    if (phoneDigits.length === 11 && phoneDigits.startsWith('1')) {
                        const usDigits = phoneDigits.substring(1);
                        displayPhone = `(${usDigits.slice(0, 3)}) ${usDigits.slice(3, 6)}-${usDigits.slice(6)}`;
                    } else if (phoneDigits.length === 10) {
                        displayPhone = `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
                    }
                }

                return NextResponse.json(
                    {
                        error: 'already_exists',
                        message: 'You are already on the waitlist!',
                        subscriber: {
                            id: rhData.data.id,
                            email: rhData.data.email,
                            name: rhData.data.name,
                            phone: displayPhone,
                            zipCode: rhData.data.extra_field,
                            userType: rhData.data.extra_field_2,
                            confirmed: rhData.data.verified
                        }
                    },
                    { status: 409 }
                );
            }
        }

        return NextResponse.json(
            {
                message: 'Successfully joined waitlist!',
                data: rhData,
                subscriberId: rhData.data?.id // Return subscriber ID for verification flow
            },
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
