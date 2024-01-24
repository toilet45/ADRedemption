import { mendingUpgrades } from "./mending-upgrades";
import { mendingMilestones } from "./mending-milestones";
import { warpUpgrades } from "./warp-upgrades";
import { corruptionUpgrades } from "./corruption-upgrades";
import { kohlerProgress } from "./kohler-unlock-progress";

export const mending = {
    upgrades: mendingUpgrades,
    milestones: mendingMilestones,
    corruptionUpgrades: corruptionUpgrades,
    warpUpgrades: warpUpgrades,
    kohlerUnlockProgress: kohlerProgress,
};