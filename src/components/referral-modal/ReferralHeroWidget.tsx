'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ReferralHeroWidgetProps {
    widgetId: string;
    userEmail?: string | null;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId, userEmail }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!widgetId) return;
        setStatus('loading');

        // If userEmail is provided, store it so ReferralHero can identify the user
        if (userEmail) {
            // Set the email in localStorage for ReferralHero to detect
            try {
                localStorage.setItem('rh_email', userEmail);
            } catch (e) {
                console.warn('Could not store email in localStorage:', e);
            }
        }

        const containerId = `referralhero-dashboard-${widgetId}`;

        // Clear the container for a fresh render
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }

        // Observer to detect when the widget renders content
        const observer = new MutationObserver(() => {
            if (containerRef.current && containerRef.current.children.length > 0) {
                setStatus('loaded');
                observer.disconnect();
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current, { childList: true, subtree: true });
        }

        // The global RH script is already loaded in layout.tsx.
        // We just need to re-trigger the widget initialization.
        // The RH global object should detect our div and render into it.
        const timer = setTimeout(() => {
            // Try to use the RH API to regenerate the widget
            try {
                const rhGlobal = (window as any)[`RH_${widgetId}`];

                // If email is provided, try to authenticate the user
                if (userEmail && rhGlobal && typeof rhGlobal.authenticate === 'function') {
                    console.log('Authenticating user with email:', userEmail);
                    rhGlobal.authenticate(userEmail);
                } else if (rhGlobal && typeof rhGlobal.generate === 'function') {
                    rhGlobal.generate();
                }
            } catch (e) {
                console.warn('RH API not available:', e);
            }

            // Also load the widget-specific script as a fallback
            // (but don't remove existing scripts — the global one must stay)
            const existingWidgetScript = document.querySelector(
                `script[src*="${widgetId}.js"]`
            );

            if (!existingWidgetScript) {
                const script = document.createElement('script');
                script.src = `https://d7zve4d3u0dfm.cloudfront.net/production/${widgetId}.js`;
                script.async = true;
                document.body.appendChild(script);
            } else {
                // Script already exists — re-load it with cache bust to force re-execution
                const script = document.createElement('script');
                script.src = `https://d7zve4d3u0dfm.cloudfront.net/production/${widgetId}.js?t=${Date.now()}`;
                script.async = true;
                document.body.appendChild(script);
            }
        }, 500);

        // Fallback: hide spinner after 8s
        const fallback = setTimeout(() => setStatus('loaded'), 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(fallback);
            observer.disconnect();
        };
    }, [widgetId, pathname]);

    return (
        <div className="relative w-full" style={{ minHeight: '50px' }}>
            <div
                id={`referralhero-dashboard-${widgetId}`}
                ref={containerRef}
                style={{ minHeight: '50px', width: '100%' }}
                className="transition-opacity duration-500 opacity-100"
            />
            {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#423DF9]"></div>
                </div>
            )}
        </div>
    );
};

export default ReferralHeroWidget;
