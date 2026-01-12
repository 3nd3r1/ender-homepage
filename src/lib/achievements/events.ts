import type {
    AchievementEvent,
    AchievementEventType,
} from "@/validators/achievements";
import { AchievementStorage } from "./storage";
import { AchievementManager } from "./manager";

export class AchievementEventDispatcher {
    private static instance: AchievementEventDispatcher;
    private storage: AchievementStorage;
    private manager: AchievementManager;
    private listeners: Map<string, ((event: AchievementEvent) => void)[]> =
        new Map();

    constructor() {
        this.storage = AchievementStorage.getInstance();
        this.manager = AchievementManager.getInstance();
    }

    static getInstance(): AchievementEventDispatcher {
        if (!AchievementEventDispatcher.instance) {
            AchievementEventDispatcher.instance =
                new AchievementEventDispatcher();
        }
        return AchievementEventDispatcher.instance;
    }

    dispatch(type: AchievementEventType, data?: Record<string, unknown>): void {
        const event: AchievementEvent = {
            id: crypto.randomUUID(),
            type,
            timestamp: new Date(),
            data,
        };

        // Store the event
        this.storage.addEvent(event);

        // Check achievements
        const unlockedIds = this.manager.checkAllAchievements(event);

        // Notify listeners
        this.notifyListeners(type, event);

        // If achievements were unlocked, dispatch unlock events
        unlockedIds.forEach((id) => {
            this.notifyListeners("achievement_unlock", {
                ...event,
                type: "achievement_unlock",
                data: { achievementId: id },
            });
        });
    }

    addEventListener(
        eventType: string,
        callback: (event: AchievementEvent) => void,
    ): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)!.push(callback);
    }

    removeEventListener(
        eventType: string,
        callback: (event: AchievementEvent) => void,
    ): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    private notifyListeners(eventType: string, event: AchievementEvent): void {
        const listeners = this.listeners.get(eventType) || [];
        listeners.forEach((callback) => {
            try {
                callback(event);
            } catch (error) {
                console.error("Error in achievement event listener:", error);
            }
        });
    }

    // Convenience methods for common events
    trackPageVisit(page: string, metadata?: Record<string, unknown>): void {
        this.dispatch("page_visit", { page, ...metadata });

        // Update stats
        const stats = this.storage.getStore().stats;
        if (!stats.pagesVisited.includes(page)) {
            stats.pagesVisited.push(page);
            this.storage.updateStats({ pagesVisited: stats.pagesVisited });
        }
    }

    trackThemeSwitch(theme: string): void {
        this.dispatch("theme_switch", { theme });
    }

    trackWorkView(workId: string): void {
        this.dispatch("work_view", { workId });

        // Update stats
        const stats = this.storage.getStore().stats;
        if (!stats.worksViewed.includes(workId)) {
            stats.worksViewed.push(workId);
            this.storage.updateStats({ worksViewed: stats.worksViewed });
        }
    }

    trackBlogRead(postId: string, timeSpent?: number): void {
        this.dispatch("blog_read", { postId, timeSpent });

        // Update stats
        const stats = this.storage.getStore().stats;
        if (!stats.blogPostsRead.includes(postId)) {
            stats.blogPostsRead.push(postId);
            this.storage.updateStats({ blogPostsRead: stats.blogPostsRead });
        }
    }

    trackSessionStart(): void {
        this.dispatch("session_start");

        // Update visit count
        const stats = this.storage.getStore().stats;
        this.storage.updateStats({
            totalVisits: stats.totalVisits + 1,
            lastVisit: new Date(),
        });
    }

    trackSessionEnd(): void {
        this.dispatch("session_end");
    }

    trackConsoleOpen(): void {
        this.dispatch("console_open");
    }

    trackTimeMilestone(timeSpent: number): void {
        this.dispatch("time_milestone", { timeSpent });

        // Update stats
        this.storage.updateStats({ totalTimeSpent: timeSpent });
    }
}
