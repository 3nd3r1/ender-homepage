import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { BiLinkExternal } from "react-icons/bi";

import { getWork, getWorks } from "@/lib/work";
import { Work, WorkInfo } from "@/validators/work";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const work = await getWork(params.slug);

    return {
        title: work.title + " | Viljami Ranta",
        description: work.description,
        openGraph: {
            images: [work.image.url],
        },
        twitter: {
            title: work.title + " | Viljami Ranta",
            description: work.description,
            images: [work.image.url],
        },
    };
}

export async function generateStaticParams() {
    const works = await getWorks();
    return works.map((work: Work) => ({
        slug: work.slug,
    }));
}

const InfoEntry = ({ info }: { info: WorkInfo }) => (
    <div className="flex flex-row gap-2 ml-8">
        <div>
            <span className="dark:bg-purple-700 dark:text-purple-200 text-sm px-1">
                {info.title}
            </span>
        </div>
        <div>
            {info.isLink && info.url ? (
                <Link
                    target="_blank"
                    href={info.url}
                    className="flex flex-row items-center gap-1"
                >
                    {info.text}
                    <BiLinkExternal />
                </Link>
            ) : (
                <p>{info.text}</p>
            )}
        </div>
    </div>
);

const WorkPage = async ({ params }: { params: { slug: string } }) => {
    const work = await getWork(params.slug);
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
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: work.content.html }}
            />
            <div>
                {work.workInfos.map((info: WorkInfo) => (
                    <InfoEntry key={info.id} info={info} />
                ))}
            </div>
            <div>
                <Image
                    width={600}
                    height={600}
                    src={work.image.url}
                    alt={work.title}
                    className="rounded-none shadow-lg"
                    priority
                />
            </div>
        </div>
    );
};

export default WorkPage;
