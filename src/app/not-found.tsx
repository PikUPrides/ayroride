"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Define patterns that should show the 404 page
    const show404Patterns = [
      '/blog',
      '/post',
      '/posts',
      '/article',
      '/articles',
      '/news',
      '/data',
      '/content',
      '/wp-',
      '/wordpress'
    ];

    // Check if the current path matches any pattern that should show 404
    const shouldShow404 = show404Patterns.some(pattern =>
      pathname.toLowerCase().includes(pattern.toLowerCase())
    );

    // If it doesn't match blog/data patterns, redirect to homepage immediately
    if (!shouldShow404) {
      // Use replace to avoid adding to browser history
      window.location.replace('/');
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-5">
      <Image
        alt="Error image"
        width={340}
        height={273}
        src="/assets/404-error.jpg"
      ></Image>
      <h2 className="text-[#1A54F2] text-4xl font-semibold">404</h2>
      <h1 className="text-4xl xl:text-6xl font-semibold text-center">
        There's Nothing Here{" "}
      </h1>
      <Link className="blue-cta" href="/">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
