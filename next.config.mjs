/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.graphassets.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
