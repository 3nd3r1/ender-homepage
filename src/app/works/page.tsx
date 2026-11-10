import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

import { getWorks, getFeaturedWorks } from "@/lib/work";
import { Work } from "@/validators/work";

export const metadata: Metadata = {
    title: "Works | Viljami Ranta",
};

const WorkEntry = ({ work }: { work: Work }) => (
    <Link href={"/works/" + work.slug} scroll={false}>
        <div className="flex flex-col w-full gap-1 overflow-hidden">
            <Image
                src={work.image ? work.image.url : "/images/default-image.jpg"}
                alt={work.title}
                width={720}
                height={400}
                className="rounded-none w-full h-28 object-cover"
            />
            <h3 className="w-100 text-center text-xl mt-2">{work.title}</h3>
            <p className="text-sm text-center">{work.description}</p>
            {work.stack.length > 0 && (
                <div className="flex flex-row gap-1 flex-wrap justify-center mt-1">
                    {work.stack.map((tech) => (
                        <span
                            key={tech}
                            className="dark:bg-neutral-700 bg-neutral-300 text-xs px-1"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </Link>
);

const ArchiveEntry = ({ work }: { work: Work }) => (
    <li className="flex flex-col">
        <div className="flex flex-row items-baseline gap-2 min-w-0">
            <Link
                href={"/works/" + work.slug}
                scroll={false}
                className="text-base font-bold break-words min-w-0 text-purple-700 dark:text-purple-500 hover:underline"
            >
                {work.title}
            </Link>
            <span className="text-xs shrink-0">{work.createdYear}</span>
        </div>
        <p className="text-xs break-words">{work.description}</p>
    </li>
);

const byYearDesc = (a: Work, b: Work) => b.createdYear - a.createdYear;

const WorksPage = async () => {
    const allWorks = await getWorks();
    const featuredWorks = (await getFeaturedWorks()).sort(byYearDesc);
    // featured: null is normalised to false by WorkSchema
    const archivedWorks = allWorks
        .filter((work) => !work.featured)
        .sort(byYearDesc);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="font-bold text-xl">Featured Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 py-4 justify-items-center gap-8">
                    {featuredWorks.map((work: Work) => (
                        <WorkEntry key={work.slug} work={work} />
                    ))}
                </div>
            </div>
            {archivedWorks.length > 0 && (
                <>
                    <hr className="border-gray-600" />
                    <div>
                        <h2 className="font-bold text-lg">Archive</h2>
                        <p className="text-xs">
                            Older projects, kept for sentimental value.
                        </p>
                        <ul className="flex flex-col gap-3 pt-3">
                            {archivedWorks.map((work: Work) => (
                                <ArchiveEntry key={work.slug} work={work} />
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorksPage;
