import Link from "next/link";
import { Metadata } from "next";

import { getBlog, getBlogs } from "@/lib/blog";
import FeedbackForm from "@/components/feedback-form";
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
            title: blogDetails.title + " | Viljami Ranta",
            description: blogDetails.description,
            type: "article",
            publishedTime: blogDetails.created,
        },
        twitter: {
            title: blogDetails.title + " | Viljami Ranta",
            description: blogDetails.description,
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
            {process.env.NEXT_PUBLIC_WEB3FORMS_KEY && (
                <div className="flex flex-col gap-8 mt-4">
                    <hr className="border-gray-600" />
                    <div>
                        <h2 className="font-bold text-lg">Feedback</h2>
                        <FeedbackForm
                            subject={`Blog feedback: ${blogDetails.title}`}
                            page={`/blog/${params.slug}`}
                            intro="Disagree with something, spot a mistake, or just liked it? Tell me. Anonymous unless you leave an email."
                            textClassName="text-xs"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPage;
