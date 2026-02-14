import { NextResponse } from 'next/server';

/**
 * API endpoint to add AYRO_WAITLIST_MEMBER tag to all subscribers
 * GET /api/update-all-subscribers
 */
export async function GET(request: Request) {
    try {
        const API_KEY = process.env.REFERRALHERO_API_KEY;
        const UUID = process.env.REFERRALHERO_UUID;

        if (!API_KEY || !UUID) {
            return NextResponse.json(
                { error: 'ReferralHero credentials missing' },
                { status: 500 }
            );
        }

        console.log('Fetching all subscribers from ReferralHero...');

        // Fetch all subscribers
        const response = await fetch(`https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        const data = await response.json();

        if (!response.ok || !data.data?.subscribers) {
            console.error('Failed to fetch subscribers:', data);
            return NextResponse.json(
                { error: 'Failed to fetch subscribers', details: data },
                { status: 500 }
            );
        }

        const subscribers = data.data.subscribers;
        console.log(`Found ${subscribers.length} total subscribers`);

        // Filter subscribers that don't have the tag
        const subscribersToUpdate = subscribers.filter((sub: any) =>
            sub.extra_field_3 !== 'AYRO_WAITLIST_MEMBER'
        );

        console.log(`${subscribersToUpdate.length} subscribers need to be updated`);

        // Update each subscriber
        const results = {
            total: subscribers.length,
            needUpdate: subscribersToUpdate.length,
            updated: 0,
            failed: 0,
            errors: [] as any[]
        };

        for (const subscriber of subscribersToUpdate) {
            try {
                console.log(`Updating subscriber ${subscriber.id} (${subscriber.email})...`);

                const updatePayload = {
                    email: subscriber.email,
                    name: subscriber.name,
                    extra_field: subscriber.extra_field, // zipCode
                    extra_field_2: subscriber.extra_field_2, // userType
                    extra_field_3: 'AYRO_WAITLIST_MEMBER', // Add the tag
                    double_optin: true
                };

                // Add phone if it exists
                if (subscriber.phone_number) {
                    updatePayload.phone_number = subscriber.phone_number;
                }

                const updateResponse = await fetch(
                    `https://app.referralhero.com/api/v2/lists/${UUID}/subscribers/${subscriber.id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${API_KEY}`
                        },
                        body: JSON.stringify(updatePayload)
                    }
                );

                const updateData = await updateResponse.json();

                if (updateResponse.ok && updateData.status !== 'error') {
                    results.updated++;
                    console.log(`✅ Updated subscriber ${subscriber.id}`);
                } else {
                    results.failed++;
                    results.errors.push({
                        subscriberId: subscriber.id,
                        email: subscriber.email,
                        error: updateData.message || 'Unknown error'
                    });
                    console.error(`❌ Failed to update ${subscriber.id}:`, updateData);
                }

                // Add a small delay to avoid rate limiting (100ms between requests)
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error: any) {
                results.failed++;
                results.errors.push({
                    subscriberId: subscriber.id,
                    email: subscriber.email,
                    error: error.message
                });
                console.error(`❌ Error updating ${subscriber.id}:`, error);
            }
        }

        console.log('Update complete:', results);

        return NextResponse.json({
            success: true,
            message: `Updated ${results.updated} subscribers successfully`,
            results
        });

    } catch (error: any) {
        console.error('Error in update-all-subscribers:', error);
        return NextResponse.json(
            { error: 'Failed to update subscribers', details: error.message },
            { status: 500 }
        );
    }
}
