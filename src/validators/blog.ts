import { z } from "zod";

export const BlogImageSchema = z.object({
    url: z.url(),
});

export const BlogContentSchema = z.object({
    html: z.string(),
});

export const BlogSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    created: z.string(),
    image: BlogImageSchema,
    content: BlogContentSchema,
});

export type BlogImage = z.infer<typeof BlogImageSchema>;
export type BlogContent = z.infer<typeof BlogContentSchema>;
export type Blog = z.infer<typeof BlogSchema>;
