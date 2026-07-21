/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // WARNING: Ignore TypeScript errors during production builds
        ignoreBuildErrors: true,
    },
    eslint: {
        // WARNING: Ignore ESLint errors during production builds
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;