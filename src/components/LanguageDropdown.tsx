"use client";

import { useState, useRef, useEffect } from "react";

const languages = [
    { code: "en", label: "English", countryCode: "us" },
    { code: "zh-CN", label: "Chinese (Simplified)", countryCode: "cn" },
    { code: "fil", label: "Filipino", countryCode: "ph" },
    { code: "es", label: "Spanish", countryCode: "es" },
    { code: "vi", label: "Vietnamese", countryCode: "vn" },
];

export default function LanguageDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lang: typeof languages[0]) => {
        const select = document.querySelector(
            ".goog-te-combo"
        ) as HTMLSelectElement;

        if (select) {
            select.value = lang.code;
            select.dispatchEvent(new Event("change"));
        }
        setCurrentLang(lang);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className="fixed bottom-6 left-6 z-[9999] font-sans"
            ref={dropdownRef}
        >
            {/* Dropdown Menu - Opens Upward */}
            <div className={`
                absolute bottom-full left-0 mb-4 w-72 
                bg-white/95 backdrop-blur-xl 
                rounded-lg shadow-2xl overflow-hidden origin-bottom-left
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
            `}>
                <div className="max-h-[60vh] overflow-y-auto py-4 px-5 space-y-2">
                    <div className="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        Select Language
                    </div>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang)}
                            className={`flex items-center gap-6 w-full px-5 py-2.5 h-12 text-left text-sm rounded-md
                                ${currentLang.code === lang.code
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                }
                            `}
                        >
                            <img
                                src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                alt={lang.label}
                                className="w-8 h-5 object-cover rounded shadow-sm ring-1 ring-gray-900/5"
                            />
                            <span className="flex-1 text-base">{lang.label}</span>
                            {currentLang.code === lang.code && (
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-3 px-1.5 py-1.5 pr-4
                    bg-white/90 backdrop-blur-sm border border-gray-200/60 
                    rounded-full shadow-lg shadow-gray-200/40 
                    ${isOpen ? "ring-2 ring-blue-500/10 border-blue-500/50" : ""}
                `}
                aria-label="Select language"
            >
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200">
                    <img
                        src={`https://flagcdn.com/w40/${currentLang.countryCode}.png`}
                        alt={currentLang.label}
                        className="w-full h-full object-cover scale-150"
                    />
                </div>

                <span className="text-sm font-semibold text-gray-700">
                    {currentLang.label}
                </span>

                <div className={`
                    w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center 
                    text-gray-400 ml-1
                    ${isOpen ? "rotate-180 bg-blue-50 text-blue-500" : ""}
                `}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
        </div>
    );
}
