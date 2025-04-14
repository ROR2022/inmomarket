import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'usrfmjuafaoutfetaphw.supabase.co',
        protocol: 'https',
      },
    ],
  },
  transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
