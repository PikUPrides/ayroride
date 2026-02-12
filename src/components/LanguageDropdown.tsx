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

export default function LanguageDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Build the script only if it doesn't already exist
        let addScript = document.querySelector("script[src*='translate.google.com']");

        if (!addScript) {
            addScript = document.createElement("script");
            (addScript as HTMLScriptElement).src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            (addScript as HTMLScriptElement).async = true;
            document.body.appendChild(addScript);
        }

        // Ensure global callback is defined
        (window as any).googleTranslateElementInit = () => {
            if ((window as any).google && (window as any).google.translate) {
                new (window as any).google.translate.TranslateElement(
                    { pageLanguage: "en", autoDisplay: false },
                    "google_translate_element"
                );
            }
        };
    }, []);

    const changeLanguage = (lang: typeof languages[0]) => {
        const setLanguage = () => {
            const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
            if (combo) {
                combo.value = lang.code;
                combo.dispatchEvent(new Event("change"));
                combo.dispatchEvent(new Event("input")); // Dispatch input for safer measure
                combo.click(); // Sometimes click is needed to wake it up
            }
        };

        setLanguage();
        // Retry logic to handle race conditions
        setTimeout(setLanguage, 100);
        setTimeout(setLanguage, 500);
        setTimeout(setLanguage, 1000); // One more safety retry

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
        <div className="language-dropdown-container notranslate" ref={dropdownRef}>
            <div className={`language-menu ${isOpen ? "open" : "closed"}`}>
                <div className="language-menu-inner">
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
                className={`language-trigger ${isOpen ? "open" : ""}`}
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