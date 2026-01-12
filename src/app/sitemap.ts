import type { MetadataRoute } from "next";

import { Work } from "@/validators/work";
import { Blog } from "@/validators/blog";

import { getWorks } from "@/lib/work";
import { getBlogs } from "@/lib/blog";

type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
};

const siteUrl = process.env.SITE_URL ?? "https://viljamiranta.fi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const works = await getWorks();
    const blogs = await getBlogs();

    const worksSitemap = works.map(
        (work: Work) =>
            ({
                url: siteUrl + "/works/" + work.slug,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            }) as SitemapEntry,
    );

    const blogsSitemap = blogs.map(
        (blog: Blog) =>
            ({
                url: siteUrl + "/blog/" + blog.slug,
                lastModified: new Date(blog.created),
                changeFrequency: "monthly",
                priority: 0.6,
            }) as SitemapEntry,
    );

    return [
        {
            url: siteUrl + "/",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: siteUrl + "/works",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: siteUrl + "/blog",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...worksSitemap,
        ...blogsSitemap,
    ];
}
