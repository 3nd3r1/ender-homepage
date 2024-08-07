import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BiLinkExternal } from "react-icons/bi";

import { getWorkDetails, getWorks } from "@/services/works";

const InfoEntry = ({ type, text, isLink, link }: any) => (
    <div className="flex flex-row gap-2 ml-8">
        <div>
            <span className="dark:bg-purple-700 dark:text-purple-200 text-sm px-1">
                {type}
            </span>
        </div>
        <div>
            {isLink ? (
                <Link
                    target="_blank"
                    href={link}
                    className="flex flex-row items-center gap-1"
                >
                    {text}
                    <BiLinkExternal />
                </Link>
            ) : (
                <p>{text}</p>
            )}
        </div>
    </div>
);

const Work = async ({ params }: { params: { slug: string } }) => {
    const work = await getWorkDetails(params.slug);
    return (
        <div className="page-content flex flex-col gap-4">
            <div className="flex flex-row">
                <Link href="/works" className="text-lg" scroll={false}>
                    works
                </Link>
                <span className="px-2 text-lg">/</span>
                <h2 className="text-xl">
                    {work.title}
                    <span className="text-sm ml-2 dark:bg-neutral-700 bg-neutral-400 px-1">
                        {work.createdYear}
                    </span>
                </h2>
            </div>
            <div
                className="prose text-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: work.content.html }}
            />
            <div>
                {work.workInfos.map((info: any) => (
                    <InfoEntry
                        key={info.id}
                        type={info.title}
                        text={info.text}
                        isLink={info.isLink}
                        link={info.url}
                    />
                ))}
            </div>
            <div>
                <Image
                    width={600}
                    height={600}
                    src={work.image.url}
                    alt={work.title}
                    className="rounded-lg shadow-lg"
                    priority
                />
            </div>
        </div>
    );
};

export async function generateStaticParams() {
    const works = await getWorks();

    return works.map((work: any) => ({
        slug: work.slug,
    }));
}

export default Work;
