'use client';

import React from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
    userEmail?: string | null;
    subscriberId?: string | null;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId }) => {
    return (
        <div
            id={`referralhero-dashboard-${widgetId}`}
            style={{
                minHeight: '400px',
                width: '100%'
            }}
        />
    );
};

export default ReferralHeroWidget;
