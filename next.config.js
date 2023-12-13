/** @type {import('next').NextConfig} */
module.exports = {
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
