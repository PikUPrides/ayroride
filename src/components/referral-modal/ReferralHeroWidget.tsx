'use client';

import React, { useEffect, useState } from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
    userEmail?: string | null;
    subscriberId?: string | null;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Wait for ReferralHero to fully initialize
        const checkInterval = setInterval(() => {
            const container = document.getElementById(`referralhero-dashboard-${widgetId}`);
            if (container && container.children.length > 0) {
                // Widget has been populated by ReferralHero
                clearInterval(checkInterval);
                setTimeout(() => setIsReady(true), 300);
            }
        }, 100);

        // Fallback: show after 3 seconds even if not detected
        const fallbackTimer = setTimeout(() => {
            clearInterval(checkInterval);
            setIsReady(true);
        }, 3000);

        return () => {
            clearInterval(checkInterval);
            clearTimeout(fallbackTimer);
        };
    }, [widgetId]);

    return (
        <div style={{ position: 'relative', minHeight: '400px', width: '100%' }}>
            {/* Loading overlay - stays on top until widget is ready */}
            {!isReady && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    minHeight: '400px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    zIndex: 9999
                }}>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#423DF9]"></div>
                </div>
            )}
            {/* ReferralHero widget container */}
            <div
                id={`referralhero-dashboard-${widgetId}`}
                style={{
                    minHeight: '400px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1
                }}
            />
        </div>
    );
};

export default ReferralHeroWidget;
