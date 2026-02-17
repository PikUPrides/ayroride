"use client";

import { useState, useEffect } from "react";
import styles from "../app/page.module.css";

const testimonials = [
    {
        quote: "The referral program is brilliantly simple. I shared my link with friends who were also tired of unpredictable pricing, and within days I'd reached the first reward tier. The dashboard makes tracking progress fun!",
        author: "Sarah L."
    },
    {
        quote: <span>I've been frustrated with surge pricing for years. <span className="notranslate" translate="no">AYRO</span>'s referral program not only rewards me financially but lets me be part of the solution. It feels great knowing I'm helping create fairer ridesharing.</span>,
        author: "Michael J."
    },
    {
        quote: "The transparency is refreshing. No hidden fees, no surprise charges. Just honest pricing every single time. This is what ridesharing should have been from the start.",
        author: "David K."
    },
    {
        quote: <span>As a driver-turned-rider, I appreciate that <span className="notranslate" translate="no">AYRO</span> treats both sides fairly. It's a win-win that actually feels genuine.</span>,
        author: "Amanda R."
    }
];

export default function TestimonialsSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [slideWidth, setSlideWidth] = useState(505 + 36); // Default desktop width

    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            const tablet = width > 768 && width <= 1024;
            setIsMobile(mobile);
            setIsTablet(tablet);
            if (mobile) {
                setSlideWidth(width - 40 + 20); // wrapper width + gap 
            } else if (tablet) {
                // On tablet: card width = 45vw - 10px, gap = 20px
                const cardWidth = width * 0.45 - 10;
                setSlideWidth(cardWidth + 20); // card width + gap
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
                                    src="/assets/Group-8-3.svg"
                                    alt="5 stars"
                                    className={styles.starsImage}
                                />
                                <p className={styles.testimonialQuote}>
                                    " {testimonial.quote} "
                                </p>
                                <div className={styles.testimonialFooter}>
                                    <span className={styles.authorName}>— {testimonial.author}</span>
                                    <img
                                        src="/assets/Vector-50.svg"
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
