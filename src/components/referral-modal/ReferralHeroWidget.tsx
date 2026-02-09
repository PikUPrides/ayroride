'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!widgetId) return;

        setStatus('loading');
        const scriptId = `referralhero-widget-script-${widgetId}`;
        const containerId = `referralhero-dashboard-${widgetId}`;

        // Cleanup function to remove script and clear container
        const cleanup = () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) existingScript.remove();

            const container = document.getElementById(containerId);
            if (container) container.innerHTML = '';
        };

        // Ensure clean slate
        cleanup();

        // Observer to detect when the widget actually renders content into our container
        const observer = new MutationObserver((mutations) => {
            const container = containerRef.current;
            if (container && container.children.length > 0) {
                // Widget has injected content
                setStatus('loaded');
                observer.disconnect();
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current, { childList: true, subtree: true });
        }

        // Small timeout to allow DOM paint before script runs (just to be safe)
        const timer = setTimeout(() => {
            const script = document.createElement('script');
            // Use the base URL without query params
            script.src = `https://d7zve4d3u0dfm.cloudfront.net/production/${widgetId}.js`;
            script.async = true;
            script.id = scriptId;

            script.onerror = () => {
                setStatus('loaded'); // Just hide the spinner
            };

            document.body.appendChild(script);
        }, 50);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
            cleanup();
        };
    }, [widgetId]);

    return (
        <div className="relative w-full" style={{ minHeight: '50px' }}>
            {/* The Container for the Widget */}
            <div
                id={`referralhero-dashboard-${widgetId}`}
                ref={containerRef}
                style={{ minHeight: '50px', width: '100%' }}
                className="transition-opacity duration-500 opacity-100"
            />

            {/* Loading Spinner - Only show when explicitly loading, but don't block view */}
            {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#423DF9]"></div>
                </div>
            )}
        </div>
    );
};

export default ReferralHeroWidget;
