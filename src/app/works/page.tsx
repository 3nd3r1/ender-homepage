import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

import { getWorks } from "@/lib/work";
import { Work } from "@/validators/work";

export const metadata: Metadata = {
    title: "Works | Viljami Ranta",
};

const WorkEntry = ({ work }: { work: Work }) => (
    <Link href={"/works/" + work.slug} scroll={false}>
        <div className="flex flex-col rounded-lg w-60 h-56 gap-1">
            <Image
                src={work.image ? work.image.url : "images/default-image.jpg"}
                alt={work.title}
                width={1000}
                height={1000}
                className="rounded-none h-32 w-auto object-cover"
            />
            <h3 className="w-100 text-center text-xl mt-2">{work.title}</h3>
            <p className="text-sm text-center">{work.description}</p>
        </div>
    </Link>
);

const WorksPage = async () => {
    const works = await getWorks();

    return (
        <div>
            <h1 className="font-bold text-xl">Works</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 py-4 px-2 justify-items-center gap-24">
                {works.reverse().map((work: Work) => (
                    <WorkEntry key={work.title} work={work} />
                ))}
            </div>
        </div>
    );
};

export default WorksPage;
