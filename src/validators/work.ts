import { z } from "zod";

export const WorkImageSchema = z.object({
    url: z.url(),
});

export const WorkInfoSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    isLink: z.boolean(),
    url: z.url().optional().nullable(),
});

export const WorkContentSchema = z.object({
    html: z.string(),
});

export const WorkSchema = z.object({
    createdYear: z.number(),
    description: z.string(),
    content: WorkContentSchema,
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    image: WorkImageSchema,
    stack: z.array(z.string()).default([]),
    sourceUrl: z.string().nullable().optional(),
    liveUrl: z.string().nullable().optional(),
    workInfos: z.array(WorkInfoSchema),
    featured: z
        .boolean()
        .nullable()
        .optional()
        .default(false)
        .transform((val) => val ?? false),
});

// TypeScript types (inferred from schemas)
export type WorkImage = z.infer<typeof WorkImageSchema>;
export type WorkInfo = z.infer<typeof WorkInfoSchema>;
export type WorkContent = z.infer<typeof WorkContentSchema>;
export type Work = z.infer<typeof WorkSchema>;
