"use client";

import React, {
    createContext,
    type ReactNode,
    useState,
    useEffect,
    useCallback,
} from "react";
import type { Achievement, AchievementEvent } from "@/validators/achievements";
import { AchievementStorage } from "@/lib/achievements/storage";
import { AchievementManager } from "@/lib/achievements/manager";
import { AchievementEventDispatcher } from "@/lib/achievements/events";

export interface AchievementContextType {
    achievements: Record<string, Achievement>;
    loading: boolean;
    unlockAchievement: (id: string) => boolean;
    fireEvent: (type: string, data?: Record<string, unknown>) => void;
    getAchievement: (id: string) => Achievement | undefined;
    getAllAchievements: () => Record<string, Achievement>;
    getUnlockedCount: () => number;
    getTotalCount: () => number;
    getCompletionPercentage: () => number;
    clearAllData: () => void;
    refreshAchievements: () => void;
}

export const AchievementContext = createContext<
    AchievementContextType | undefined
>(undefined);

export function AchievementProvider({ children }: { children: ReactNode }) {
    const [achievements, setAchievements] = useState<
        Record<string, Achievement>
    >({});
    const [loading, setLoading] = useState(true);

    const storage = AchievementStorage.getInstance();
    const manager = AchievementManager.getInstance();
    const dispatcher = AchievementEventDispatcher.getInstance();

    const refreshAchievements = useCallback(() => {
        setAchievements(storage.getAchievements());
    }, [storage]);

    useEffect(() => {
        const handleUnlock = (event: AchievementEvent) => {
            console.log("🏆 Achievement Unlocked:", event.data?.achievementId);
            refreshAchievements();
        };

        dispatcher.addEventListener("achievement_unlock", handleUnlock);

        // Initial load
        refreshAchievements();
        setLoading(false);

        return () => {
            dispatcher.removeEventListener("achievement_unlock", handleUnlock);
        };
    }, [dispatcher, refreshAchievements]);

    // Expose methods for console testing
    const unlockAchievement = useCallback(
        (id: string) => {
            const success = manager.unlockAchievement(id);
            if (success) {
                console.log(`🎉 Manually unlocked achievement: ${id}`);
                refreshAchievements();
            } else {
                console.log(`❌ Failed to unlock achievement: ${id}`);
            }
            return success;
        },
        [manager, refreshAchievements],
    );

    const fireEvent = useCallback(
        (type: string, data?: Record<string, unknown>) => {
            if (type === "theme_switch") {
                dispatcher.trackThemeSwitch(data?.theme as string);
            } else if (type === "page_visit") {
                dispatcher.trackPageVisit(data?.page as string, data);
            } else if (type === "work_view") {
                dispatcher.trackWorkView(data?.workId as string);
            } else if (type === "blog_read") {
                dispatcher.trackBlogRead(
                    data?.postId as string,
                    data?.timeSpent as number,
                );
            } else if (type === "console_open") {
                dispatcher.trackConsoleOpen();
            } else {
                // Generic dispatch for other events
                dispatcher.dispatch(type as any, data);
            }
        },
        [dispatcher],
    );

    const getAchievement = useCallback(
        (id: string) => {
            return achievements[id];
        },
        [achievements],
    );

    const getAllAchievements = useCallback(() => {
        return achievements;
    }, [achievements]);

    const getUnlockedCount = useCallback(() => {
        return Object.values(achievements).filter((a) => a.isUnlocked).length;
    }, [achievements]);

    const getTotalCount = useCallback(() => {
        return Object.keys(achievements).length;
    }, [achievements]);

    const getCompletionPercentage = useCallback(() => {
        const total = getTotalCount();
        const unlocked = getUnlockedCount();
        return total > 0 ? Math.round((unlocked / total) * 100) : 0;
    }, [getTotalCount, getUnlockedCount]);

    const clearAllData = useCallback(() => {
        storage.clearAllData();
        refreshAchievements();
        console.log("🗑️ All achievement data cleared");
    }, [storage, refreshAchievements]);

    // Expose for console debugging in development only
    useEffect(() => {
        if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
            (window as unknown as Record<string, unknown>).achievements = {
                unlock: unlockAchievement,
                get: getAchievement,
                getAll: getAllAchievements,
                clear: clearAllData,
                fire: fireEvent,
                stats: () => storage.getStore().stats,
                events: () => storage.getStore().events,
            };
        }
    }, [
        unlockAchievement,
        getAchievement,
        getAllAchievements,
        clearAllData,
        fireEvent,
        storage,
    ]);

    const value: AchievementContextType = {
        achievements,
        loading,
        unlockAchievement,
        fireEvent,
        getAchievement,
        getAllAchievements,
        getUnlockedCount,
        getTotalCount,
        getCompletionPercentage,
        clearAllData,
        refreshAchievements,
    };

    return (
        <AchievementContext.Provider value={value}>
            {children}
        </AchievementContext.Provider>
    );
}
