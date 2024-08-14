import type { MetadataRoute } from "next";

import { Work } from "@/lib/definitions";

import { getWorks } from "@/services/works";

type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const works = await getWorks();

    const worksSitemap = works.map((work: Work) => ({
        url: "/works/" + work.slug,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
    } as SitemapEntry));

    return [
        {
            url: "/",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "/works",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...worksSitemap
    ];
}
