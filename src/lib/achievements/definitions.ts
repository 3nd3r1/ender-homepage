import type { Achievement } from "@/validators/achievements";

export const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
    {
        id: "theme-switcher",
        title: "Theme Switcher",
        description: "Switch between light and dark theme",
        icon: "🌓",
        unlockCondition: {
            type: "theme_switch",
            target: 1,
        },
        isUnlocked: false,
    },
];

export function getAchievementById(id: string): Achievement | undefined {
    return ACHIEVEMENT_DEFINITIONS.find((achievement) => achievement.id === id);
}

export function getAllAchievements(): Achievement[] {
    return [...ACHIEVEMENT_DEFINITIONS];
}

export function getUnlockedAchievements(
    achievements: Record<string, Achievement>,
): Achievement[] {
    return Object.values(achievements).filter(
        (achievement) => achievement.isUnlocked,
    );
}

export function getLockedAchievements(
    achievements: Record<string, Achievement>,
): Achievement[] {
    return Object.values(achievements).filter(
        (achievement) => !achievement.isUnlocked,
    );
}

export function getCompletionPercentage(
    achievements: Record<string, Achievement>,
): number {
    const total = Object.keys(achievements).length;
    const unlocked = getUnlockedAchievements(achievements).length;
    return total > 0 ? Math.round((unlocked / total) * 100) : 0;
}
