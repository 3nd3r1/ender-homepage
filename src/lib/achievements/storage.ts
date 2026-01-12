import type {
    Achievement,
    AchievementStore,
    AchievementEvent,
    AchievementStats,
    AchievementSettings,
} from "@/validators/achievements";
import { AchievementStoreSchema } from "@/validators/achievements";
import { ACHIEVEMENT_DEFINITIONS } from "./definitions";

const STORAGE_KEY = "ender-portfolio-achievements";
const STORAGE_VERSION = 1;

function createDefaultStore(): AchievementStore {
    const achievements: Record<string, Achievement> = {};

    // Initialize all achievements from definitions
    ACHIEVEMENT_DEFINITIONS.forEach((def) => {
        achievements[def.id] = { ...def };
    });

    return {
        achievements,
        events: [],
        stats: {
            totalVisits: 0,
            totalTimeSpent: 0,
            firstVisit: new Date(),
            lastVisit: new Date(),
            pagesVisited: [],
            worksViewed: [],
            blogPostsRead: [],
        },
        settings: {
            showToasts: true,
            soundEnabled: false,
        },
        version: STORAGE_VERSION,
    };
}

export class AchievementStorage {
    private static instance: AchievementStorage;
    private store: AchievementStore;

    constructor() {
        this.store = this.loadStore();
    }

    static getInstance(): AchievementStorage {
        if (!AchievementStorage.instance) {
            AchievementStorage.instance = new AchievementStorage();
        }
        return AchievementStorage.instance;
    }

    private loadStore(): AchievementStore {
        try {
            if (typeof window === "undefined") {
                return createDefaultStore();
            }

            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return createDefaultStore();
            }

            const parsed = JSON.parse(stored);

            // Convert date strings back to Date objects
            if (parsed.stats) {
                parsed.stats.firstVisit = new Date(parsed.stats.firstVisit);
                parsed.stats.lastVisit = new Date(parsed.stats.lastVisit);
            }

            if (parsed.events) {
                parsed.events = parsed.events.map(
                    (event: Record<string, unknown>) => ({
                        ...event,
                        timestamp: new Date(event.timestamp as string),
                    }),
                );
            }

            if (parsed.achievements) {
                Object.values(parsed.achievements).forEach(
                    (achievement: unknown) => {
                        const ach = achievement as Record<string, unknown>;
                        if (ach.unlockedAt) {
                            ach.unlockedAt = new Date(ach.unlockedAt as string);
                        }
                    },
                );
            }

            // Validate with Zod
            const validatedStore = AchievementStoreSchema.parse(parsed);

            // Handle version migration if needed
            if (validatedStore.version !== STORAGE_VERSION) {
                return this.migrateStore(validatedStore);
            }

            return validatedStore;
        } catch (error) {
            console.warn("Failed to load achievements from storage:", error);
            return createDefaultStore();
        }
    }

    private migrateStore(_oldStore: AchievementStore): AchievementStore {
        // For now, just reset to default on version mismatch
        // In the future, implement proper migration logic
        return createDefaultStore();
    }

    private saveStore(): void {
        try {
            if (typeof window === "undefined") return;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.store));
        } catch (error) {
            console.error("Failed to save achievements to storage:", error);
        }
    }

    getStore(): AchievementStore {
        return { ...this.store };
    }

    getAchievements(): Record<string, Achievement> {
        return { ...this.store.achievements };
    }

    getAchievement(id: string): Achievement | undefined {
        return this.store.achievements[id];
    }

    unlockAchievement(id: string): boolean {
        const achievement = this.store.achievements[id];
        if (!achievement || achievement.isUnlocked) {
            return false;
        }

        achievement.isUnlocked = true;
        achievement.unlockedAt = new Date();

        // Add unlock event
        this.addEvent({
            id: crypto.randomUUID(),
            type: "achievement_unlock",
            timestamp: new Date(),
            data: { achievementId: id },
        });

        this.saveStore();
        return true;
    }

    updateAchievementProgress(id: string, progress: number): void {
        const achievement = this.store.achievements[id];
        if (!achievement) return;

        achievement.progress = progress;
        this.saveStore();
    }

    addEvent(event: AchievementEvent): void {
        this.store.events.push(event);

        // Keep only last 1000 events to prevent storage bloat
        if (this.store.events.length > 1000) {
            this.store.events = this.store.events.slice(-1000);
        }

        this.saveStore();
    }

    updateStats(updates: Partial<AchievementStats>): void {
        this.store.stats = { ...this.store.stats, ...updates };
        this.saveStore();
    }

    updateSettings(updates: Partial<AchievementSettings>): void {
        this.store.settings = { ...this.store.settings, ...updates };
        this.saveStore();
    }

    clearAllData(): void {
        this.store = createDefaultStore();
        this.saveStore();
    }

    exportData(): string {
        return JSON.stringify(this.store, null, 2);
    }

    importData(data: string): boolean {
        try {
            const parsed = JSON.parse(data);
            const validated = AchievementStoreSchema.parse(parsed);
            this.store = validated;
            this.saveStore();
            return true;
        } catch {
            return false;
        }
    }
}
