import { useContext } from "react";
import { AchievementContext } from "@/contexts/achievement-context";

export function useAchievements() {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error(
            "useAchievements must be used within an AchievementProvider",
        );
    }
    return context;
}
