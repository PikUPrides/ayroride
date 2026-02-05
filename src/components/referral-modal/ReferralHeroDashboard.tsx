'use client';

import React, { useEffect } from 'react';

const ReferralHeroDashboard = () => {
    useEffect(() => {
        // Function to reload the global script
        const loadScript = () => {
            const scriptId = 'referralhero-global-reloader';
            const existingScript = document.getElementById(scriptId);

            // Remove existing reloader script if it exists to force a refresh
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = 'https://d7zve4d3u0dfm.cloudfront.net/production/RH0d3a5b93dd.js';
            script.id = scriptId;
            script.async = true;
            document.body.appendChild(script);
        };

        // Small timeout to ensure the div is painted
        const timer = setTimeout(() => {
            loadScript();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="referralhero-dashboard-MP20c6k3d" style={{ minHeight: '500px' }}></div>
    );
};

export default ReferralHeroDashboard;
