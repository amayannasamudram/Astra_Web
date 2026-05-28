const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: isProd ? "standalone" : undefined,
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
      {
        source: "/admin/:path*",
        destination: `${backendUrl}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
