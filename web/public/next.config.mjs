/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true, // Disable image optimization to bypass proxy issues
  },
};

export default nextConfig;
