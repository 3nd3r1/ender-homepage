/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
    siteUrl: process.env.SITE_URL || "https://viljamiranta.fi",
    generateRobotsTxt: true,
};

export default sitemapConfig;
