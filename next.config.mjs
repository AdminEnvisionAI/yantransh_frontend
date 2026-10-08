/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Set DISABLE_HOST_REDIRECT=true if the hosting panel already redirects between www and the bare domain.
    if (process.env.DISABLE_HOST_REDIRECT === "true") return [];
    return [
      // One canonical host: send yantranshvt.com to www.yantranshvt.com.
      { source: "/:path*", has: [{ type: "host", value: "yantranshvt.com" }], destination: "https://www.yantranshvt.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
