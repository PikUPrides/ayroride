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
        // Update UI immediately (gives feedback before reload)
        setCurrentLang(lang);
        setIsOpen(false);

        const host = window.location.hostname;
        const hostParts = host.split('.');

        if (lang.code === "en") {
            // Clear cookies on all possible domain variations to ensure Google Translate resets
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}; path=/;`;
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${host}; path=/;`;

            if (hostParts.length > 1) {
                const rootDomain = hostParts.slice(-2).join('.');
                document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${rootDomain}; path=/;`;
                document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${rootDomain}; path=/;`;
            }

            // We reload because Google Translate doesn't easily let us switch back to the original language programmatically
            setTimeout(() => {
                window.location.reload();
            }, 50);
            return;
        }

        // Set cookie for the selected language
        document.cookie = `googtrans=/en/${lang.code}; path=/`;
        document.cookie = `googtrans=/en/${lang.code}; domain=${host}; path=/`;
        document.cookie = `googtrans=/en/${lang.code}; domain=.${host}; path=/`;

        // Trigger Google Translate manually using its hidden combo box
        // Poll until the combo box is ready (may take time on first load)
        let attempts = 0;
        const maxAttempts = 30; // 30 * 100ms = 3 seconds max wait
        const trySetLanguage = () => {
            const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
            if (combo && combo.options.length > 1) {
                combo.value = lang.code;
                combo.dispatchEvent(new Event("change"));
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(trySetLanguage, 100);
            } else {
                // Fallback: reload the page with the cookie set
                window.location.reload();
            }
        };
        trySetLanguage();
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