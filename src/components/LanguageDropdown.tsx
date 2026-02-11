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
                absolute bottom-full left-0 mb-3 w-80 max-h-80 overflow-y-auto
                bg-white/95 backdrop-blur-xl border border-white/20
                shadow-2xl rounded-2xl origin-bottom-left
                transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ring-1 ring-black/5
                ${isOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"}
            `}>
                <div className="py-3">
                    <div className="px-6 pt-1 pb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider select-none">
                        Select Language
                    </div>

                    {languages.map((lang) => {
                        const isActive = currentLang.code === lang.code;
                        return (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang)}
                                className={`
                                    flex items-center w-full px-6 min-h-[52px] text-base
                                    transition-colors duration-150
                                    ${isActive
                                        ? "bg-gray-100/80 text-gray-900 font-medium"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                                role="option"
                                aria-selected={isActive}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <img
                                        src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                        alt=""
                                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                                    />

                                    <span className="flex-1 text-left">
                                        {lang.label}
                                    </span>

                                    {isActive && (
                                        <svg
                                            className="w-4 h-4 text-gray-700 opacity-70"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-3 pl-4 pr-5 py-3.5
                    bg-white/90 backdrop-blur-md border border-gray-200/60
                    shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-gray-300/80
                    rounded-full transition-all duration-300 active:scale-95 group
                    ${isOpen ? "ring-4 ring-gray-500/10 border-gray-300 bg-white" : ""}
                `}
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="relative flex items-center justify-center bg-gray-50 rounded-full p-1 border border-gray-100">
                    <img
                        src={`https://flagcdn.com/w40/${currentLang.countryCode}.png`}
                        alt={currentLang.label}
                        className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm"
                    />
                </div>

                <span className="text-base font-semibold text-gray-700 tracking-tight group-hover:text-gray-900 transition-colors">
                    {currentLang.label}
                </span>

                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-out group-hover:text-gray-600 ${isOpen ? "rotate-180 text-gray-600" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}