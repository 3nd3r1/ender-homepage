import type {
    AchievementEvent,
    AchievementCondition,
} from "@/validators/achievements";
import { AchievementStorage } from "./storage";

export class AchievementManager {
    private static instance: AchievementManager;
    private storage: AchievementStorage;

    constructor() {
        this.storage = AchievementStorage.getInstance();
    }

    static getInstance(): AchievementManager {
        if (!AchievementManager.instance) {
            AchievementManager.instance = new AchievementManager();
        }
        return AchievementManager.instance;
    }

    checkAchievement(id: string, event?: AchievementEvent): boolean {
        const achievement = this.storage.getAchievement(id);
        if (!achievement || achievement.isUnlocked) {
            return false;
        }

        const isUnlocked = this.evaluateCondition(
            achievement.unlockCondition,
            event,
        );

        if (isUnlocked) {
            return this.storage.unlockAchievement(id);
        }

        return false;
    }

    checkAllAchievements(event?: AchievementEvent): string[] {
        const achievements = this.storage.getAchievements();
        const unlockedIds: string[] = [];

        Object.keys(achievements).forEach((id) => {
            if (this.checkAchievement(id, event)) {
                unlockedIds.push(id);
            }
        });

        return unlockedIds;
    }

    private evaluateCondition(
        condition: AchievementCondition,
        event?: AchievementEvent,
    ): boolean {
        const store = this.storage.getStore();

        switch (condition.type) {
            case "theme_switch": {
                if (event?.type !== "theme_switch") return false;
                const themeEvents = store.events.filter(
                    (e) => e.type === "theme_switch",
                );
                return themeEvents.length >= (condition.target || 1);
            }

            case "page_visit": {
                if (condition.metadata?.pages) {
                    // Check if all required pages have been visited
                    const requiredPages = condition.metadata.pages as string[];
                    const visitedPages = store.stats.pagesVisited;
                    return requiredPages.every((page) =>
                        visitedPages.includes(page),
                    );
                }
                return (
                    store.stats.pagesVisited.length >= (condition.target || 1)
                );
            }

            case "time_spent": {
                return store.stats.totalTimeSpent >= (condition.target || 0);
            }

            case "work_view": {
                if (condition.target === -1) {
                    // Dynamic target - check if all works have been viewed
                    // This would need to be updated when we know the total number of works
                    return false;
                }
                return (
                    store.stats.worksViewed.length >= (condition.target || 1)
                );
            }

            case "blog_read": {
                if (condition.metadata?.timeSpent) {
                    // Check for dedicated reader (time spent on single post)
                    // This would need event data about time spent on specific posts
                    return false;
                }
                return (
                    store.stats.blogPostsRead.length >= (condition.target || 1)
                );
            }

            case "visit_count": {
                return store.stats.totalVisits >= (condition.target || 1);
            }

            case "time_of_day": {
                const hour = new Date().getHours();
                const targetHour = condition.metadata?.hour as number;
                const comparison = condition.metadata?.comparison as string;

                if (comparison === "before") {
                    return hour < targetHour;
                } else if (comparison === "after") {
                    return hour >= targetHour;
                }
                return false;
            }

            case "day_of_week": {
                const day = new Date().getDay();
                const targetDays = condition.metadata?.days as number[];
                return targetDays.includes(day);
            }

            case "console_open": {
                if (event?.type !== "console_open") return false;
                const consoleEvents = store.events.filter(
                    (e) => e.type === "console_open",
                );
                return consoleEvents.length >= (condition.target || 1);
            }

            case "achievement_page_visit": {
                if (event?.type !== "page_visit") return false;
                return event?.data?.page === "/achievements";
            }

            default:
                return false;
        }
    }

    // Manual unlock for testing
    unlockAchievement(id: string): boolean {
        return this.storage.unlockAchievement(id);
    }

    // Get achievement progress for display
    getAchievementProgress(
        id: string,
    ): { current: number; max: number } | null {
        const achievement = this.storage.getAchievement(id);
        if (!achievement) return null;

        if (
            achievement.progress !== undefined &&
            achievement.maxProgress !== undefined
        ) {
            return {
                current: achievement.progress,
                max: achievement.maxProgress,
            };
        }

        return null;
    }

    // Update achievement progress
    updateProgress(id: string, progress: number): void {
        this.storage.updateAchievementProgress(id, progress);

        // Check if achievement should be unlocked
        this.checkAchievement(id);
    }
}
