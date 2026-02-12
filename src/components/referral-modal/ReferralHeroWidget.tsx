'use client';

import React, { useEffect } from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
    userEmail?: string | null;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId, userEmail }) => {
    useEffect(() => {
        console.log('🚀 ReferralHeroWidget mounted');
        console.log('Widget ID:', widgetId);
        console.log('User Email:', userEmail);

        // Widget script is already loaded by global tracking code in layout.tsx
        // Just wait for it to initialize

        if (!userEmail) {
            console.log('No email provided, widget will show signup form');
            return;
        }

        let attempts = 0;
        const maxAttempts = 40; // 20 seconds

        const identifyUser = () => {
            attempts++;

            try {
                const rhGlobal = (window as any)[`RH_${widgetId}`];

                if (rhGlobal && rhGlobal.form && typeof rhGlobal.form.submit === 'function') {
                    console.log('✅ ReferralHero ready! Identifying user:', userEmail);
                    // This will identify the existing subscriber and show verification screen if unverified
                    rhGlobal.form.submit({ email: userEmail });
                } else if (attempts < maxAttempts) {
                    if (attempts === 1 || attempts % 10 === 0) {
                        console.log(`⏳ Attempt ${attempts}: Waiting for ReferralHero...`);
                    }
                    setTimeout(identifyUser, 500);
                } else {
                    console.error('❌ ReferralHero not available after', maxAttempts, 'attempts');
                    console.log('Window RH keys:', Object.keys(window).filter(k => k.startsWith('RH')));
                }
            } catch (e) {
                console.error('❌ Error identifying user:', e);
            }
        };

        // Start trying to identify after 1 second
        const timer = setTimeout(identifyUser, 1000);

        return () => clearTimeout(timer);
    }, [widgetId, userEmail]);

    return (
        <div
            id={`referralhero-dashboard-${widgetId}`}
            style={{
                minHeight: '400px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}
        />
    );
};

export default ReferralHeroWidget;
