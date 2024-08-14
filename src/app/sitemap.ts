import type { MetadataRoute } from "next";

import { Work } from "@/lib/definitions";

import { getWorks } from "@/services/works";

type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
};

const siteUrl = process.env.SITE_URL ?? "https://viljamiranta.fi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const works = await getWorks();

    const worksSitemap = works.map(
        (work: Work) =>
            ({
                url: siteUrl + "/works/" + work.slug,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
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
        ...worksSitemap,
    ];
}
