"use client";

import { useState, useEffect } from "react";
import styles from "../app/page.module.css";

const testimonials = [
    {
        quote: "The referral program is brilliantly simple. I shared my link with friends who were also tired of unpredictable pricing, and within days I'd reached the first reward tier. The dashboard makes tracking progress fun!",
        author: "Sarah L."
    },
    {
        quote: "I've been frustrated with surge pricing for years. Ayro's referral program not only rewards me financially but lets me be part of the solution. It feels great knowing I'm helping create fairer ride-sharing.",
        author: "Michael J."
    },
    {
        quote: "The transparency is refreshing. No hidden fees, no surprise charges. Just honest pricing every single time. This is what ridesharing should have been from the start.",
        author: "David K."
    },
    {
        quote: "As a driver-turned-rider, I appreciate that Ayro treats both sides fairly. It's a win-win that actually feels genuine.",
        author: "Amanda R."
    }
];

export default function TestimonialsSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [slideWidth, setSlideWidth] = useState(505 + 36); // Default desktop width

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            // Calculate slide width based on screen size
            // Wrapper width = 100vw - 40px, Gap = 20px
            if (mobile) {
                setSlideWidth(window.innerWidth - 40 + 20); // wrapper width + gap 
            } else {
                setSlideWidth(505 + 36); // desktop card width + gap
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
        }, 3000);
        return () => clearInterval(timer);
    }, [maxSlide]);

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.testimonialsContainer}>
                <h3 className={styles.testimonialsTitle}>
                    What Others Are <span>Saying</span>
                </h3>
                <p className={styles.testimonialsSubtitle}>Hear from our early adopters</p>

                <div className={styles.sliderWrapper}>
                    <div
                        className={styles.sliderTrack}
                        style={{ transform: `translateX(-${currentSlide * slideWidth}px)` }}
                    >
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className={styles.testimonialCard}>
                                <img
                                    src="https://ayrorides.com/wp-content/uploads/2025/11/Group-8-3.svg"
                                    alt="5 stars"
                                    className={styles.starsImage}
                                />
                                <p className={styles.testimonialQuote}>
                                    " {testimonial.quote} "
                                </p>
                                <div className={styles.testimonialFooter}>
                                    <span className={styles.authorName}>— {testimonial.author}</span>
                                    <img
                                        src="https://ayrorides.com/wp-content/uploads/2025/11/Vector-50.svg"
                                        alt=""
                                        className={styles.quoteIcon}
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
