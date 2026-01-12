import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-5">
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
