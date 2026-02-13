"use client";

import { useState, useEffect } from "react";
import styles from "../app/about-us/page.module.css";

const testimonials = [
    {
        quote: "I was tired of unpredictable surge pricing eating into my budget. With AYRO, I know what I'm paying, drivers know what they're earning, and I've already reached the second tier of rewards. This is how ridesharing should work!",
        author: "Marcus Johnson"
    },
    {
        quote: "AYRO's referral program isn't just about rewards – it's about being part of something bigger. I've already earned ride credits and helped friends save money while supporting drivers. It's a win-win revolution!",
        author: "Sarah Mendez"
    },
    {
        quote: "After years of watching drivers struggle with unfair pay, it's refreshing to see a company that actually cares. AYRO proves you can build a successful business without exploiting anyone.",
        author: "James Carter"
    },
    {
        quote: "What sold me on AYRO was the transparency. No hidden fees, no surprise multipliers. Just honest fares every single time. I recommend it to everyone I know.",
        author: "Priya Sharma"
    }
];

export default function RiderVoicesSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [slideWidth, setSlideWidth] = useState(505 + 36);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            const tablet = width > 768 && width <= 1024;
            setIsMobile(mobile);
            setIsTablet(tablet);
            if (mobile) {
                setSlideWidth(width - 40 + 20);
            } else if (tablet) {
                const cardWidth = width * 0.45 - 10;
                setSlideWidth(cardWidth + 20);
            } else {
                setSlideWidth(505 + 36);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const slidesToShow = isMobile ? 1 : 2;
    const totalSlides = testimonials.length;
    const maxSlide = Math.max(0, totalSlides - slidesToShow);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [maxSlide]);

    return (
        <section className={styles.riderVoicesSection}>
            <div className={styles.riderVoicesContainer}>
                <h3 className={styles.riderVoicesTitle}>
                    Rider <span>Voices</span>
                </h3>
                <p className={styles.riderVoicesSubtitle}>What early adopters are saying</p>

                <div className={styles.voicesSliderWrapper}>
                    <div
                        className={styles.voicesSliderTrack}
                        style={{ transform: `translateX(-${currentSlide * slideWidth}px)` }}
                    >
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className={styles.voiceCard}>
                                <img
                                    src="/images/stars-5.svg"
                                    alt="5 stars"
                                    className={styles.voiceStarsImage}
                                />
                                <p className={styles.voiceQuote}>
                                    "{testimonial.quote}"
                                </p>
                                <div className={styles.voiceFooter}>
                                    <span className={styles.voiceAuthor}>— {testimonial.author}</span>
                                    <img
                                        src="/images/icon-quote.svg"
                                        alt=""
                                        className={styles.voiceQuoteIcon}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
