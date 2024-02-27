import { mendingUpgrades } from "./mending-upgrades";
import { mendingMilestones } from "./mending-milestones";
import { warpUpgrades } from "./warp-upgrades";
import { corruptionUpgrades } from "./corruption-upgrades";
import { kohlerUpgrades } from "./kohler-upgrades";
import { kohlerProgress } from "./kohler-unlock-progress";
import { kohlerMilestones } from "./kohler-milestones";
import { kohlerInfinityUpgrades } from "./kohler-infinity-upgrades";

export const mending = {
    upgrades: mendingUpgrades,
    milestones: mendingMilestones,
    corruptionUpgrades: corruptionUpgrades,
    warpUpgrades: warpUpgrades,
    kohlerUnlockProgress: kohlerProgress,
    kohlerUpgrades: kohlerUpgrades,
    kohlerMilestones: kohlerMilestones,
    kohlerInfinityUpgrades: kohlerInfinityUpgrades
};