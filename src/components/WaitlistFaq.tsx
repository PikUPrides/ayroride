'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import styles from '@/app/join-our-waitlist/waitlist.module.css';

const faqData: { question: string; answer: ReactNode }[] = [
    {
        question: "How do I get my referral link?",
        answer: "Sign up for the waitlist above. After verifying your email and phone number, you'll be taken to your referral dashboard where you can copy and share your unique referral link."
    },
    {
        question: "How do referrals get counted?",
        answer: "When someone signs up for the AYRO waitlist using your unique referral link, it counts as a referral. They must complete the signup with a valid email and phone number for the referral to be tracked."
    },
    {
        question: "How are rewards determined?",
        answer: "Rewards are based on your rank on the referral leaderboard. The more people you refer, the higher your rank and the bigger your rewards. Top referrers earn cash prizes, ride credits, and entries into the MacBook Pro giveaway."
    },
    {
        question: "When do I receive my rewards?",
        answer: "Rewards will be distributed when AYRO officially launches. Cash prizes will be sent directly, and ride credits will be applied to your AYRO account. MacBook Pro giveaway winners will be selected from all eligible entries."
    },
    {
        question: "Can I track my referrals?",
        answer: <>Yes! After signing up, visit your <Link href="/referral-login" style={{ color: '#423DF9', textDecoration: 'underline' }}>referral dashboard</Link> to see your total referrals, your rank on the leaderboard, and the rewards you&apos;re eligible for.</>
    },
    {
        question: "Is there a limit to how many people I can refer?",
        answer: "No limit! The more friends you refer, the higher you climb on the leaderboard. Even referring just one person enters you into the MacBook Pro giveaway."
    }
];

export default function WaitlistFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.faqContainer}>
                <h2 className={styles.faqTitle}>How Does the Referral Program Work?</h2>
                <div className={styles.faqList}>
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onToggle={() => toggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqItem({ item, isOpen, onToggle }: {
    item: { question: string; answer: ReactNode };
    isOpen: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
            <button
                className={styles.faqQuestion}
                onClick={onToggle}
                aria-expanded={isOpen}
                type="button"
            >
                <span>{item.question}</span>
                <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>+</span>
            </button>
            <div
                className={styles.faqAnswerWrapper}
                style={{ height: isOpen ? height : 0 }}
            >
                <div ref={contentRef}>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                </div>
            </div>
        </div>
    );
}
