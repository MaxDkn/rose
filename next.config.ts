import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: `/rose`,
    assetPrefix: `/rose/`,
    images: {
        unoptimized: true
    }
};

export default nextConfig;
