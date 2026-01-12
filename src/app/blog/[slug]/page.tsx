import Link from "next/link";
import { Metadata } from "next";

import { getBlog, getBlogs } from "@/lib/blog";
import { Blog } from "@/validators/blog";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const blogDetails = await getBlog(params.slug);

    return {
        title: blogDetails.title + " | Viljami Ranta",
        description: blogDetails.description,
        openGraph: {
            images: [blogDetails.image.url],
        },
        twitter: {
            title: blogDetails.title + " | Viljami Ranta",
            description: blogDetails.description,
            images: [blogDetails.image.url],
        },
    };
}

export async function generateStaticParams() {
    const blogs = await getBlogs();
    return blogs.map((blog: Blog) => ({
        slug: blog.slug,
    }));
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
    const blogDetails = await getBlog(params.slug);
    const createdDate = new Date(blogDetails.created).toLocaleDateString();

    return (
        <div className="page-content flex flex-col gap-4">
            <div className="flex flex-row">
                <Link href="/blog" className="text-lg" scroll={false}>
                    blog
                </Link>
                <span className="px-2 text-lg">/</span>
                <h2 className="text-xl">
                    {blogDetails.title}
                    <span className="text-sm ml-2 dark:bg-neutral-700 bg-neutral-400 px-1">
                        {createdDate}
                    </span>
                </h2>
            </div>
            <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: blogDetails.content.html }}
            />
        </div>
    );
};

export default BlogPage;
