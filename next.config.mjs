/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;;
