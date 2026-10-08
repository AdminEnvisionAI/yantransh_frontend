/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // One canonical host: send yantranshvt.com to www.yantranshvt.com.
      { source: "/:path*", has: [{ type: "host", value: "yantranshvt.com" }], destination: "https://www.yantranshvt.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
