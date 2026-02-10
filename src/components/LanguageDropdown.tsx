"use client";

import { useState, useRef, useEffect } from "react";

const languages = [
    { code: "en", label: "English", countryCode: "us" },
    { code: "zh-CN", label: "Chinese (Simplified)", countryCode: "cn" },
    { code: "tl", label: "Filipino", countryCode: "ph" },
    { code: "es", label: "Spanish", countryCode: "es" },
    { code: "vi", label: "Vietnamese", countryCode: "vn" },
];

export default function LanguageDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lang: typeof languages[0]) => {
        const setLanguage = () => {
            const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
            if (select) {
                select.value = lang.code;
                select.dispatchEvent(new Event("change"));
            }
        };

        setLanguage();
        // Retry a few times in case the element isn't ready
        setTimeout(setLanguage, 100);
        setTimeout(setLanguage, 500);

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
            className="fixed bottom-6 left-6 z-[9999] font-sans notranslate"
            ref={dropdownRef}
        >
            {/* Dropdown Menu - Opens Upward */}
            <div className={`
                absolute bottom-full left-0 mb-4 w-80 
                bg-white border border-gray-200 
                shadow-xl overflow-hidden origin-bottom-left
                transition-all duration-200 ease-out
                ${isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-2 scale-95 pointer-events-none"}
            `}>
                <div className="py-2 space-y-1">
                    <div className="px-14 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider select-none">
                        Language
                    </div>
                    {languages.map((lang) => {
                        const isActive = currentLang.code === lang.code;
                        return (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang)}
                                className={`flex items-center gap-6 w-full px-14 py-5 text-left text-lg transition-colors
                                    ${isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                            >
                                <img
                                    src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                    alt={lang.label}
                                    className="w-8 h-6 object-cover shadow-sm opacity-90"
                                />
                                <span className={`flex-1 ${isActive ? "font-semibold" : "font-medium"}`}>
                                    {lang.label}
                                </span>
                                {isActive && (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-6 px-6 py-4
                    bg-white border border-gray-200 
                    shadow-sm hover:shadow-md hover:border-gray-300
                    transition-all duration-200
                    ${isOpen ? "ring-2 ring-blue-500/10 border-blue-500/50" : ""}
                `}
                aria-label="Select language"
            >
                <img
                    src={`https://flagcdn.com/w40/${currentLang.countryCode}.png`}
                    alt={currentLang.label}
                    className="w-8 h-6 object-cover shadow-sm opacity-90"
                />

                <span className="text-lg font-semibold text-gray-700">
                    {currentLang.label}
                </span>

                <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-500" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}