"use client";

import { useState, useEffect, useRef } from "react";
import "./LanguageDropdown.css";

const languages = [
    { code: "en", label: "English", countryCode: "us", shortLabel: "EN" },
    { code: "zh-CN", label: "Chinese (Simplified)", countryCode: "cn", shortLabel: "ZH" },
    { code: "tl", label: "Filipino", countryCode: "ph", shortLabel: "TL" },
    { code: "es", label: "Spanish", countryCode: "es", shortLabel: "ES" },
    { code: "vi", label: "Vietnamese", countryCode: "vn", shortLabel: "VI" },
];

export default function LanguageDropdown({ isFooter = false }: { isFooter?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize ID for Google Translate
    useEffect(() => {
        // Check cookie to set initial language state
        const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
        if (match && match[1]) {
            const savedLangCode = match[1];
            const foundLang = languages.find(l => l.code === savedLangCode);
            if (foundLang) {
                setCurrentLang(foundLang);
            }
        }
    }, []);

    const changeLanguage = (lang: typeof languages[0]) => {
        // If switching to English, clear cookie and reload to reset completely
        if (lang.code === "en") {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." + document.domain + "; path=/;";
            window.location.reload();
            return;
        }

        // Otherwise set cookie and trigger translation
        document.cookie = `googtrans=/en/${lang.code}; path=/`;

        const setLanguage = () => {
            const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
            if (combo) {
                combo.value = lang.code;
                combo.dispatchEvent(new Event("change"));
            }
        };

        setLanguage();
        // Retry logic for safety
        setTimeout(setLanguage, 100);

        setCurrentLang(lang);
        setIsOpen(false);
    };

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
        <div className={`language-dropdown-container notranslate ${isFooter ? "footer-mode" : ""}`} ref={dropdownRef}>
            <div className={`language-menu ${isOpen ? "open" : "closed"} ${isFooter ? "footer-menu" : ""}`}>
                <div className="language-menu-inner" role="listbox" aria-label="Select language">
                    <div className="language-header">
                        Select Language
                    </div>

                    {languages.map((lang) => {
                        const isActive = currentLang.code === lang.code;
                        return (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang)}
                                className={`language-option ${isActive ? "active" : ""}`}
                                role="option"
                                aria-selected={isActive}
                            >
                                <div className="language-option-content">
                                    <img
                                        src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                        alt=""
                                        className="language-flag"
                                    />

                                    <span className="language-label">
                                        {lang.label}
                                    </span>

                                    {isActive && (
                                        <svg
                                            className="language-check"
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

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`language-trigger ${isOpen ? "open" : ""} ${isFooter ? "footer-trigger" : ""}`}
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="trigger-flag-wrapper">
                    <img
                        src={`https://flagcdn.com/w40/${currentLang.countryCode}.png`}
                        alt={currentLang.label}
                        className="trigger-flag"
                    />
                </div>

                <span className="trigger-label">
                    {currentLang.shortLabel}
                </span>

                <svg
                    className={`trigger-icon ${isOpen ? "open" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </button>
        </div>
    );
}