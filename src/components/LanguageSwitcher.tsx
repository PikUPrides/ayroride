'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Spanish', flag: '🇪🇸' },
    { code: 'zh', label: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'vi', label: 'Vietnamese', flag: '🇻🇳' },
    { code: 'tl', label: 'Filipino', flag: '🇵🇭' },
];

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const changeLang = (lang: string) => {
        // Replace the locale part of the path
        const match = pathname.match(/^\/(en|es|zh|vi|tl)/);
        let newPath;
        if (match) {
            newPath = pathname.replace(/^\/(en|es|zh|vi|tl)/, `/${lang}`);
        } else {
            // If no locale found (rare with middleware), prepend it
            newPath = `/${lang}${pathname}`;
        }
        router.push(newPath);
        setIsOpen(false);
    };

    const currentLangCode = pathname.split('/')[1] || 'en';
    const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

    return (
        <div className="relative" ref={dropdownRef} style={{ marginLeft: '20px', zIndex: 50 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#333' // Adjust based on header bg
                }}
            >
                <span>{currentLang.flag}</span>
                <span style={{ fontWeight: 600 }}>{currentLang.code.toUpperCase()}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '10px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    padding: '8px 0',
                    minWidth: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000
                }}>
                    {languages.map(l => (
                        <button
                            key={l.code}
                            onClick={() => changeLang(l.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                width: '100%',
                                fontSize: '15px',
                                color: '#333',
                                backgroundColor: currentLang.code === l.code ? '#F4F4F9' : 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F4F4F9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentLang.code === l.code ? '#F4F4F9' : 'transparent'}
                        >
                            <span style={{ fontSize: '18px' }}>{l.flag}</span>
                            <span>{l.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
