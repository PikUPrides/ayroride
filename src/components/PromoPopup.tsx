"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false); // Enable strict reset on navigation

        // Show popup 5 seconds after page load/navigation
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [pathname]);

    const closePopup = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
            onClick={closePopup}
        >
            <div
                className="relative w-full max-w-lg aspect-[4/5] md:aspect-square bg-transparent rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in slide-in-from-top-10 duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/assets/popup.png"
                        alt="Ayro Promo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Close Button */}
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 text-black rounded-full transition-colors shadow-md z-10"
                    aria-label="Close popup"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                {/* Call to Action Button - Bottom Center */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 z-20">
                    <Link
                        href="/join-our-waitlist"
                        onClick={closePopup}
                        className="inline-flex items-center justify-center px-12 py-4 bg-[#3F3FFF] hover:bg-[#3232cc] text-white text-lg font-bold rounded-full shadow-2xl transform transition hover:scale-105 active:scale-95 whitespace-nowrap min-w-[200px]"
                    >
                        Join Waitlist
                    </Link>
                </div>
            </div>
        </div>
    );
}
