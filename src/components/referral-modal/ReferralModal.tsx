"use client";

import React from "react";
import Image from "next/image";
import ReferralHeroWidget from "./ReferralHeroWidget";
import ReferralGraphic from "./ReferralGraphic";
import { useModal } from "@/context/ModalContext";
import styles from "./referral-modal.module.css";

export default function ReferralModal() {
    const { isModalOpen, closeModal } = useModal();

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-md transition-opacity"
                onClick={closeModal}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-[2.5rem] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.4)] w-[80vw] md:w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[70vh] animate-in fade-in zoom-in duration-500">

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 md:top-10 md:right-10 z-[60] p-2 text-white/80 hover:text-white md:text-gray-400 md:hover:text-gray-900 transition-all duration-300 group hover:bg-white/10 md:hover:bg-gray-50 rounded-full"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 transition-transform group-hover:rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Side */}
                <div className="hidden md:flex md:w-[280px] lg:w-[450px] shrink-0 bg-gradient-to-br from-[#423DF9] to-[#120E78] relative flex-col overflow-hidden">
                    <div className="flex-1 relative flex items-center justify-center -translate-y-12">
                        <ReferralGraphic />
                    </div>

                    {/* Logo */}
                    <div className="absolute top-12 left-12 z-20">
                        <Image
                            src="/Ayro_Secondary_1.png"
                            alt="AYRO"
                            width={110}
                            height={40}
                            className="brightness-0 invert object-contain"
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div className="absolute bottom-16 left-12 right-12 z-20 text-white">
                        <h2 className="text-[2.25rem] font-black leading-[1.1] mb-6 tracking-tight">
                            Refer your friends <br />
                            and <span className="text-[#08D9C4]">Earn Rewards</span>
                        </h2>
                        <p className="text-white/60 text-lg font-medium leading-relaxed max-w-sm">
                            Join our exclusive waitlist and unlock unique referral benefits today.
                        </p>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 via-[#0A0A0B]/20 to-transparent pointer-events-none" />
                </div>

                {/* Right Side */}
                <div className="flex-1 w-full flex flex-col h-full bg-white relative">

                    {/* Mobile Header */}
                    <div className="md:hidden bg-[#423DF9] pt-10 pb-10 px-8 text-center relative overflow-hidden flex flex-col items-center shrink-0">
                        <Image
                            src="/Ayro_Secondary_1.png"
                            alt="AYRO"
                            width={90}
                            height={30}
                            className="brightness-0 invert object-contain mb-6 opacity-90"
                        />
                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">Get your Referral Link</h2>
                        <p className="text-white/60 text-sm sm:text-base mt-2 mb-3">Join the AYRO waitlist</p>
                    </div>

                    {/* Mobile spacer */}
                    <div className="md:hidden h-4 bg-white shrink-0" />

                    {/* Top spacer to create visual breathing room (Desktop) */}
                    <div className="hidden md:block h-16 lg:h-20 shrink-0" />

                    <div className={`flex-1 overflow-y-auto ${styles.customScrollbar} flex flex-col`}>
                        {/* Content Wrapper */}
                        <div className="flex-grow w-full flex flex-col items-center justify-start pt-4 md:pt-12 pb-4 md:pb-16 px-4 md:px-12 relative z-10">
                            {/* Header */}
                            <div className="hidden md:block mb-8 w-full max-w-[440px]">
                                <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#423DF9] mb-3">
                                    Exclusive Access
                                </span>
                                <h3 className="text-[2rem] lg:text-[2.25rem] font-extrabold text-[#0A0A0B] tracking-tight leading-[1.05]">
                                    Get your <span className="text-[#423DF9]">Referral Link</span>
                                </h3>
                                <p className="mt-4 text-gray-500 text-[0.95rem] font-medium leading-relaxed">
                                    Please fill in your details below to join the waitlist and start earning rewards.
                                </p>
                            </div>

                            {/* Form Container */}
                            <div className="relative w-full max-w-[440px]">
                                <ReferralHeroWidget widgetId="MF2f0c6063df" />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
