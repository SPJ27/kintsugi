import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output : "standalone",
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "cdn.hackclub.com"
            }
        ]
    }
};

export default nextConfig;
