"use client";

import React from 'react';
import Image from 'next/image';

export default function ReferralGraphic() {
    return (
        <div className="w-full h-full flex items-center justify-center relative p-8">

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[70%] h-[70%] bg-[#08D9C4] rounded-full blur-[120px] opacity-30 animate-pulse" />
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px] opacity-10" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-full max-w-[360px] aspect-[314/160] relative drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-transform duration-700">
                    <Image
                        src="/referral-hero.svg"
                        alt="Referral Illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
