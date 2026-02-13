"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

const testimonials = [
    {
        rating: "/assets/Group-8-3.svg",
        text: "“AYRO’s referral program made me feel like I’m actually making a difference while earning great rewards. The dashboard makes tracking so easy!”",
        author: "— Jamie Rodriguez",
        quoteIcon: "/assets/Vector-50.svg"
    },
    {
        rating: "/assets/Group-8-3.svg",
        text: "“I’ve earned over $500 in just two weeks of sharing my link. Love being part of something that’s fixing the broken rideshare system!”",
        author: "— Alex Thompson",
        quoteIcon: "/assets/Vector-50.svg"
    },
    {
        rating: "/assets/Group-8-3.svg",
        text: "“The cash rewards are real and the payments are prompt. It’s refreshing to see a company that values its community this much.”",
        author: "— Morgan Lee",
        quoteIcon: "/assets/Vector-50.svg"
    },
    {
        rating: "/assets/Group-8-3.svg",
        text: "“Finally, a rideshare platform that treats everyone fairly. The referral bonuses are just the cherry on top of an already great service.”",
        author: "— Casey Jordan",
        quoteIcon: "/assets/Vector-50.svg"
    }
];

export default function TestimonialCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [view, setView] = useState("desktop"); // "mobile", "tablet", "desktop"
    const [slideWidth, setSlideWidth] = useState(505 + 36);

    useEffect(() => {
        const checkView = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setView("mobile");
                setSlideWidth(width - 40 + 20);
            } else if (width <= 1024) { // Tablet range match
                setView("tablet");
                // Tablet: card width = 45vw - 10px, gap = 20px
                const cardWidth = width * 0.45 - 10;
                setSlideWidth(cardWidth + 20);
            } else {
                setView("desktop");
                setSlideWidth(505 + 36);
            }
        };
        checkView();
        window.addEventListener('resize', checkView);
        return () => window.removeEventListener('resize', checkView);
    }, []);

    const slidesToShow = view === "mobile" ? 1 : 2;
    // maxSlide should allow sliding across the doubled array
    const maxSlide = testimonials.length - slidesToShow;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => {
                // For a simple loop:
                if (prev >= maxSlide) {
                    return 0;
                }
                return prev + 1;
            });
        }, 3000);
        return () => clearInterval(timer);
    }, [maxSlide]);

    return (
        <div className={styles.sliderWrapper}>
            <div
                className={styles.sliderTrack}
                style={{
                    transform: `translateX(-${currentSlide * slideWidth}px)`,
                    transition: currentSlide === 0 ? 'none' : 'transform 0.5s ease-in-out'
                }}
            >
                {testimonials.map((item, index) => (
                    <div key={index} className={styles.testimonialCard}>
                        <div className={styles.testimonialHeader}>
                            <img src={item.rating} alt="Rating" className={styles.starsImage} />
                        </div>
                        <p className={styles.testimonialText}>{item.text}</p>
                        <div className={styles.testimonialFooter}>
                            <span className={styles.author}>{item.author}</span>
                            <img src={item.quoteIcon} alt="Quote" className={styles.quoteIconImage} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
