import { z } from "zod";

export const AchievementConditionSchema = z.object({
    type: z.string(),
    target: z.number().optional(),
    event: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
});

export const AchievementSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    unlockCondition: AchievementConditionSchema,
    isUnlocked: z.boolean(),
    unlockedAt: z.date().optional(),
    progress: z.number().optional(),
    maxProgress: z.number().optional(),
});

export const AchievementEventSchema = z.object({
    id: z.string(),
    type: z.string(),
    timestamp: z.date(),
    data: z.record(z.string(), z.any()).optional(),
});

export const AchievementStatsSchema = z.object({
    totalVisits: z.number(),
    totalTimeSpent: z.number(),
    firstVisit: z.date(),
    lastVisit: z.date(),
    pagesVisited: z.array(z.string()),
    worksViewed: z.array(z.string()),
    blogPostsRead: z.array(z.string()),
});

export const AchievementSettingsSchema = z.object({
    showToasts: z.boolean(),
    soundEnabled: z.boolean(),
});

export const AchievementStoreSchema = z.object({
    achievements: z.record(z.string(), AchievementSchema),
    events: z.array(AchievementEventSchema),
    stats: AchievementStatsSchema,
    settings: AchievementSettingsSchema,
    version: z.number(),
});

export const AchievementConditionTypeSchema = z.enum([
    "page_visit",
    "theme_switch",
    "time_spent",
    "work_view",
    "blog_read",
    "visit_count",
    "time_of_day",
    "day_of_week",
    "console_open",
    "achievement_page_visit",
]);

export const AchievementEventTypeSchema = z.enum([
    "page_visit",
    "theme_switch",
    "work_view",
    "blog_read",
    "session_start",
    "session_end",
    "time_milestone",
    "console_open",
    "achievement_unlock",
]);

export type AchievementCondition = z.infer<typeof AchievementConditionSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type AchievementEvent = z.infer<typeof AchievementEventSchema>;
export type AchievementStats = z.infer<typeof AchievementStatsSchema>;
export type AchievementSettings = z.infer<typeof AchievementSettingsSchema>;
export type AchievementStore = z.infer<typeof AchievementStoreSchema>;
export type AchievementConditionType = z.infer<
    typeof AchievementConditionTypeSchema
>;
export type AchievementEventType = z.infer<typeof AchievementEventTypeSchema>;
