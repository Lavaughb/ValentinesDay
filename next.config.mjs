import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Required for GitHub Pages
  images: {
    unoptimized: true,   // Required for GitHub Pages static export
  },
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // If your GitHub repo name is "ValentinesDay", uncomment the line below:
  // basePath: '/ValentinesDay', 
};

export default withBundleAnalyzer(nextConfig);