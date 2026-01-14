'use client';

import PostCard from "./PostCard";
import { useRef, useState, MouseEvent, useEffect } from 'react';

export default function RelatedPosts({
    relatedPosts
}: {
    relatedPosts: any[];
}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);

    // Auto-scroll effect
    useEffect(() => {
        if (!scrollContainerRef.current || isDragging || isHovered) return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const maxScroll = container.scrollWidth - container.clientWidth;

                // If at the end, scroll back to start
                if (container.scrollLeft >= maxScroll - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll by one card width (400px + 24px gap)
                    container.scrollBy({ left: 424, behavior: 'smooth' });
                }
            }
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval);
    }, [isDragging, isHovered]);

    const handleMouseDown = (e: MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setHasMoved(false);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
        }

        // If user didn't move much, allow clicks to go through
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;

        // If moved more than 5px, consider it a drag
        if (Math.abs(walk) > 5) {
            setHasMoved(true);
        }

        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab';
            }
        }
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleClick = (e: MouseEvent) => {
        // Prevent click if user was dragging
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="w-full md:max-w-[1240px] mx-auto" style={{ marginTop: '60px', paddingTop: '40px', paddingBottom: '80px' }}>
            <h2 className="text-center text-[#1D0652] max-w-[390px] md:max-w-full mx-auto" style={{
                fontFamily: 'Open Sans, Sans-serif',
                fontSize: '40px',
                fontWeight: 800,
                fontStyle: 'normal',
                lineHeight: '50px',
                color: '#1D0652',
                marginBottom: '40px'
            }}>
                Popular Post
            </h2>

            {/* Slider Container */}
            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth select-none mx-5 md:mx-0"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    cursor: 'grab'
                }}
            >
                {relatedPosts.map((post) => (
                    <div
                        key={post.slug}
                        className="flex-shrink-0 drag-container"
                        style={{ width: '400px' }}
                        onClick={handleClick}
                    >
                        <PostCard post={post} />
                    </div>
                ))}
            </div>

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .select-none {
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                .drag-container * {
                    pointer-events: auto;
                }
            `}</style>
        </div>
    );
}
