import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

import { getBlogs } from "@/lib/blog";
import { Blog } from "@/validators/blog";

export const metadata: Metadata = {
    title: "Blog | Viljami Ranta",
};

const BlogEntry = ({ blog }: { blog: Blog }) => (
    <Link href={"/blog/" + blog.slug} scroll={false} className="w-full">
        <div className="flex flex-col rounded-lg w-full max-w-60 mx-auto gap-1">
            <Image
                src={blog.image ? blog.image.url : "/images/default-image.jpg"}
                alt={blog.title}
                width={480}
                height={270}
                className="rounded-none h-32 w-full object-cover"
            />
            <h3 className="w-100 text-center text-xl mt-2">{blog.title}</h3>
            <p className="text-sm text-center">{blog.description}</p>
        </div>
    </Link>
);

const BlogPage = async () => {
    const blogs = await getBlogs();

    return (
        <div>
            <h1 className="font-bold text-xl">Blog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 py-4 px-2 justify-items-center gap-x-8 gap-y-12">
                {blogs.map((blog: Blog) => (
                    <BlogEntry key={blog.slug} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
