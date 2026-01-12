"use client";

import { useState, useEffect } from "react";
import styles from "../app/about-us/page.module.css";

const testimonials = [
    {
        quote: "I was tired of unpredictable surge pricing eating into my budget. With PikUP, I know what I'm paying, drivers know what they're earning, and I've already reached the second tier of rewards. This is how ride-sharing should work!",
        author: "Marcus Johnson"
    },
    {
        quote: "PikUP's referral program isn't just about rewards – it's about being part of something bigger. I've already earned ride credits and helped friends save money while supporting drivers. It's a win-win revolution!",
        author: "Sarah Mendez"
    }
];

export default function RiderVoicesSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [slideWidth, setSlideWidth] = useState(505 + 36);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setSlideWidth(window.innerWidth - 40 + 20);
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
