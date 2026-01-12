"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

const originalTestimonials = [
    {
        rating: "/assets/Group-8-3.svg",
        text: "“PikUP’s referral program made me feel like I’m actually making a difference while earning great rewards. The dashboard makes tracking so easy!”",
        author: "— Jamie Rodriguez",
        quoteIcon: "/assets/Vector-50.svg"
    },
    {
        rating: "/assets/Group-8-3.svg",
        text: "“I’ve earned over $500 in just two weeks of sharing my link. Love being part of something that’s fixing the broken ride-share system!”",
        author: "— Alex Thompson",
        quoteIcon: "/assets/Vector-50.svg"
    }
];

// Double the testimonials to allow sliding even when 2 are shown
const testimonials = [...originalTestimonials, ...originalTestimonials, ...originalTestimonials];

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
            } else if (width <= 1100) { // Tablet range
                setView("tablet");
                // For tablet, we can show 2 slides but they need to be slightly narrower than 505px
                // Total wrapper width is usually around 90-95%
                setSlideWidth((width * 0.9) / 2 + 10);
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
