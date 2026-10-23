import { getBlog, getBlogs } from "@/lib/blog";
import { ogColors, ogSize, renderOgImage } from "@/lib/og";
import { Blog } from "@/validators/blog";

export const alt = "Blog post by Viljami Ranta";
export const size = ogSize;
export const contentType = "image/png";

const COVER_WIDTH = 420;

// Hygraph can serve covers as WebP, which the image renderer can't decode
const toJpegUrl = (url: string) =>
    url.replace(/\/([^/]+)$/, "/output=format:jpg/$1");

export async function generateStaticParams() {
    const blogs = await getBlogs();
    return blogs.map((blog: Blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogOpenGraphImage({
    params,
}: {
    params: { slug: string };
}) {
    const blog = await getBlog(params.slug);
    const cover = await fetch(toJpegUrl(blog.image.url));
    const coverSrc = `data:image/jpeg;base64,${Buffer.from(
        await cover.arrayBuffer(),
    ).toString("base64")}`;

    return renderOgImage(
        "~/viljamiranta.fi/blog",
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                color: ogColors.text,
            }}
        >
            <div
                style={{
                    display: "block",
                    fontSize: 30,
                    color: ogColors.accent,
                    lineClamp: 1,
                }}
            >
                {`$ cat ${blog.slug}.md`}
            </div>
            <div
                style={{
                    display: "block",
                    marginTop: 16,
                    fontSize: 56,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    lineClamp: 3,
                }}
            >
                {blog.title}
            </div>
            <div
                style={{
                    display: "block",
                    marginTop: 24,
                    fontSize: 26,
                    lineHeight: 1.4,
                    color: ogColors.muted,
                    lineClamp: 3,
                }}
            >
                {blog.description}
            </div>
            <div
                style={{
                    marginTop: 28,
                    fontSize: 24,
                    color: ogColors.muted,
                }}
            >
                {`Viljami Ranta · ${blog.created}`}
            </div>
        </div>,
        <img
            src={coverSrc}
            alt=""
            width={COVER_WIDTH}
            height={COVER_WIDTH}
            style={{
                objectFit: "cover",
                borderRadius: 12,
                border: `2px solid ${ogColors.border}`,
            }}
        />,
    );
}
