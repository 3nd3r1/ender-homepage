/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || "https://viljamiranta.fi",
	generateRobotsTxt: true, // (optional)
	// ...other options
};
