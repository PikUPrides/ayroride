'use client';

import React, { useEffect, useRef } from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId }) => {
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        if (!widgetId) return;

        const scriptId = `referralhero-widget-script-${widgetId}`;
        const containerId = `referralhero-dashboard-${widgetId}`;

        // Cleanup function to remove script and clear container
        const cleanup = () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) existingScript.remove();

            const container = document.getElementById(containerId);
            if (container) container.innerHTML = '';

            // Also try to clean up any global ReferralHero state if accessible/known (risky, so skipping)
        };

        cleanup();

        // Small timeout to allow DOM paint
        const timer = setTimeout(() => {
            const script = document.createElement('script');
            // Use the base URL without query params to avoid potential CDN caching issues or strict checking
            script.src = `https://d7zve4d3u0dfm.cloudfront.net/production/${widgetId}.js`;
            script.async = true;
            script.id = scriptId;
            document.body.appendChild(script);
            scriptLoadedRef.current = true;
        }, 100);

        return () => {
            clearTimeout(timer);
            // On unmount, we want to clean up to avoid duplicates when re-opening
            cleanup();
        };
    }, [widgetId]);

    return (
        <div
            id={`referralhero-dashboard-${widgetId}`}
            style={{ minHeight: '520px', width: '100%' }}
        />
    );
};

export default ReferralHeroWidget;
