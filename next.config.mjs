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
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
};

export default nextConfig;
