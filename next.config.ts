import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output : "standalone",
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "cdn.hackclub.com", 
                
            },
            {
                protocol : "https",
                hostname : "avatars.slack-edge.com",
            }
        ]
    }
};

export default nextConfig;
