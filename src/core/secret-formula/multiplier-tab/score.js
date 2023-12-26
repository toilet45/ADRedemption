import { MultiplierTabIcons } from "./icons";
import { CorruptionData } from "../../corruption";

// See index.js for documentation
export const hostScore = {
total: {
    name: "Total Score",
    displayOverride: () => `${format(CorruptionData.calcScore(), 2, 2)}`,
    multValue: () => CorruptionData.calcScore(),
    isActive: () => CorruptionData.isCorrupted,
    icon: MultiplierTabIcons.CORRUPTION,
    },
  corruptions: {
    name: "Corruptions",
    displayOverride: () => `${formatInt(CorruptionData.calcBaseScore(), 2, 2)} base score`,
    multValue: () => CorruptionData.calcBaseScore(),
    isActive: () => CorruptionData.isCorrupted,
    icon: MultiplierTabIcons.CORRUPTION,
  },
  extra: {
    name: "Bonus",
    multValue: () => [0, 1, 3, 10, 35, 126, 462, 1716, 6435, 24310, 92378][Math.floor(Math.min(CorruptionData.corruptions.countWhere(u => u > 0), CorruptionData.corruptions.reduce((partialSum, a) => partialSum + a, 0) + 2))],
    displayOverride: () => formatX([0, 1, 3, 10, 35, 126, 462, 1716, 6435, 24310, 92378][Math.floor(Math.min(CorruptionData.corruptions.countWhere(u => u > 0), CorruptionData.corruptions.reduce((partialSum, a) => partialSum + a, 0) + 2))], 2, 2),
    isActive: () => CorruptionData.isCorrupted,
    icon: MultiplierTabIcons.CORRUPTION_BONUS,
  },
  cu20: {
    name: "Rewarding Glyphs",
    powValue: () => 1 + Math.log(Math.log(CorruptionData.corruptions[4] * Math.max(1,CorruptionData.corruptionChallenge.bGLwC)))/2,
    isActive: () => CorruptionData.isCorrupted && CorruptionData.corruptions[4] >= 4,
    icon: MultiplierTabIcons.UPGRADE("corruption"),
  }
};
