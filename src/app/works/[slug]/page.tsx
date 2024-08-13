import Link from "next/link";
import Image from "next/image";

import { BiLinkExternal } from "react-icons/bi";

import { getWorkDetails, getWorks } from "@/services/works";
import { Work, WorkInfo } from "@/lib/definitions";

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
            {info.isLink ? (
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
    const workDetails = await getWorkDetails(params.slug);
    return (
        <div className="page-content flex flex-col gap-4">
            <div className="flex flex-row">
                <Link href="/works" className="text-lg" scroll={false}>
                    works
                </Link>
                <span className="px-2 text-lg">/</span>
                <h2 className="text-xl">
                    {workDetails.title}
                    <span className="text-sm ml-2 dark:bg-neutral-700 bg-neutral-400 px-1">
                        {workDetails.createdYear}
                    </span>
                </h2>
            </div>
            <div
                className="prose text-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: workDetails.content.html }}
            />
            <div>
                {workDetails.workInfos.map((info: WorkInfo) => (
                    <InfoEntry info={info} />
                ))}
            </div>
            <div>
                <Image
                    width={600}
                    height={600}
                    src={workDetails.image.url}
                    alt={workDetails.title}
                    className="rounded-lg shadow-lg"
                    priority
                />
            </div>
        </div>
    );
};

export default WorkPage;
