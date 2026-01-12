"use client";

import { useState } from "react";
import styles from "../app/page.module.css";

const faqData = [
    {
        question: "How does the referral program work?",
        answer: "Sign up to receive your unique link, then share it with friends. You'll earn rewards as people join through your link, with increasing prizes at 10, 25, and 50 referrals."
    },
    {
        question: "What rewards can I earn?",
        answer: "Rewards include cash payments up to $1,000, ride credits for future use, and entry into our MacBook Pro giveaway when you reach the highest tier."
    },
    {
        question: "When will I receive my rewards?",
        answer: "Rewards are distributed automatically when you reach each tier threshold. You'll receive notification and can track your progress on your personal dashboard."
    },
    {
        question: "Is there a deadline to participate?",
        answer: "The referral program is available to early adopters for a limited time. Join now to maximize your earning potential and secure your early adopter status."
    },
    {
        question: "How does PikUP eliminate surge pricing?",
        answer: "Our model creates predictable pricing by building a large user base first, then launching with transparent fares that fairly compensate drivers without exploiting riders during peak times."
    }
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.faqContainer}>
                {/* Left Side - Title and Description */}
                <div className={styles.faqLeft}>
                    <h3 className={styles.faqTitle}>
                        Frequently Asked Questions <span>About PikUP</span>
                    </h3>
                    <p className={styles.faqSubtitle}>
                        Find answers to frequently asked questions about our referral program and rewards system.
                    </p>
                </div>

                {/* Right Side - Accordion */}
                <div className={styles.faqRight}>
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
                        >
                            <button
                                className={styles.faqQuestion}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className={styles.faqIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M6.99984 12.8356H12.8332V7.00228C12.8332 6.69286 12.9561 6.39611 13.1749 6.17732C13.3937 5.95853 13.6904 5.83561 13.9998 5.83561C14.3093 5.83561 14.606 5.95853 14.8248 6.17732C15.0436 6.39611 15.1665 6.69286 15.1665 7.00228L15.1665 12.8356H20.9998C21.3093 12.8356 21.606 12.9585 21.8248 13.1773C22.0436 13.3961 22.1665 13.6929 22.1665 14.0023C22.1665 14.3117 22.0436 14.6084 21.8248 14.8272C21.606 15.046 21.3093 15.1689 20.9998 15.1689H15.1665V21.0023C15.1665 21.3117 15.0436 21.6084 14.8248 21.8272C14.606 22.046 14.3093 22.1689 13.9998 22.1689C13.6904 22.1689 13.3937 22.046 13.1749 21.8272C12.9561 21.6084 12.8332 21.3117 12.8332 21.0023V15.1689L6.99984 15.1689C6.69042 15.1689 6.39367 15.046 6.17488 14.8272C5.95609 14.6084 5.83317 14.3117 5.83317 14.0023C5.83317 13.6929 5.95609 13.3961 6.17488 13.1773C6.39367 12.9585 6.69042 12.8356 6.99984 12.8356Z" fill="#08D9C4" />
                                    </svg>
                                </span>
                                <span className={styles.faqQuestionText}>{faq.question}</span>
                            </button>
                            <div className={styles.faqAnswer}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
