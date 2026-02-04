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
        </div>
    </Link>
);

const WorksPage = async () => {
    const allWorks = await getWorks();
    const featuredWorks = await getFeaturedWorks();
    const archivedWorks = allWorks.filter((work) => !work.featured);

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
            <hr className="border-gray-600" />
            <div>
                <h2 className="font-bold text-xl">All Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 py-4 justify-items-center gap-8">
                    {archivedWorks.map((work: Work) => (
                        <WorkEntry key={work.slug} work={work} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorksPage;
