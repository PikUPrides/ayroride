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

        // Use the same approach as waitlist: POST to create endpoint
        // ReferralHero returns existing subscriber if email already exists
        // This works for BOTH verified and unverified subscribers (unlike retrieve_by_email)
        console.log('Looking up subscriber by email (via create endpoint):', email);

        const payload: any = {
            email: email,
            name: 'Login Attempt', // Dummy data - won't update if subscriber exists
            extra_field_3: 'LOGIN_ATTEMPT', // Marker to identify if this created a new subscriber
            double_optin: true
        };

        const response = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || data.status === 'error') {
            console.error('ReferralHero API Error:', data);
            return NextResponse.json(
                { error: 'Failed to look up email.' },
                { status: 500 }
            );
        }

        // Check the hidden marker field to determine if this is a real subscriber
        if (data.data) {
            const subscriberMarker = data.data.extra_field_3;

            console.log('Subscriber marker:', subscriberMarker);

            if (subscriberMarker === 'LOGIN_ATTEMPT') {
                // This subscriber was just created by this login attempt
                // Delete it and return "not found"
                console.log('Subscriber was created by login attempt, deleting:', data.data.id);

                try {
                    const deleteResponse = await fetch(
                        `https://app.referralhero.com/api/v2/lists/${UUID}/subscribers/${data.data.id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${API_KEY}`
                            }
                        }
                    );

                    if (deleteResponse.ok) {
                        console.log('Successfully deleted accidentally created subscriber');
                    } else {
                        console.error('Failed to delete subscriber:', await deleteResponse.json());
                    }
                } catch (deleteError) {
                    console.error('Error deleting subscriber:', deleteError);
                }

                return NextResponse.json(
                    { error: 'Email not found. Please join the waitlist first.' },
                    { status: 404 }
                );
            } else if (subscriberMarker === 'AYRO_WAITLIST_MEMBER') {
                // Real subscriber from our waitlist
                console.log('Subscriber found:', data.data.id, '| Verified:', data.data.verified);

                return NextResponse.json(
                    {
                        message: 'Subscriber found',
                        subscriberId: data.data.id,
                        verified: data.data.verified || false
                    },
                    { status: 200 }
                );
            } else {
                // Subscriber has no marker or unexpected marker - not from our waitlist
                console.log('Subscriber has invalid/missing marker:', subscriberMarker);
                return NextResponse.json(
                    { error: 'Email not found. Please join the waitlist first.' },
                    { status: 404 }
                );
            }
        }

        // No subscriber data returned
        console.log('Subscriber not found:', email);
        return NextResponse.json(
            { error: 'Email not found. Please join the waitlist first.' },
            { status: 404 }
        );

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
