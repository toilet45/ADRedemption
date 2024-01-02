import { MultiplierTabHelper } from "./helper-functions";
import { MultiplierTabIcons } from "./icons";

// See index.js for documentation
export const gamespeed = {
  total: {
    name: "Game speed",
    displayOverride: () => {
      if (Enslaved.isStoringRealTime) return `Set to ${format(0)} (storing real time)`;
      if (EternityChallenge(12).isRunning) return `${formatX(1)}/${formatInt(1000)} (fixed)`;
      const curr = getGameSpeedupFactor();

      const bh = MultiplierTabHelper.blackHoleSpeeds();
      const currBH = bh.current;
      const avgBH = bh.average;

      const avgSpeed = Enslaved.isAutoReleasing
        ? getGameSpeedupForDisplay()
        : curr.div(currBH).times(avgBH);
      const avgString = ` (current) | ${formatX(avgSpeed, 2, 2)} (average)`;
      return `${formatX(curr, 2, 2)}${curr === avgSpeed ? "" : avgString}`;
    },
    multValue: () => getGameSpeedupForDisplay(),
    isActive: () => PlayerProgress.seenAlteredSpeed(),
    dilationEffect: () => (Effarig.isRunning ? Effarig.multDilation : 1),
    isDilated: true,
    overlay: ["Δ", `<i class="fas fa-clock" />`, `<i class="fas fa-circle" />`],
  },
  glyph: {
    name: "Equipped Glyphs",
    multValue: () => getAdjustedGlyphEffect("timespeed"),
    powValue: () => getAdjustedGlyphEffect("effarigblackhole"),
    isActive: () => PlayerProgress.realityUnlocked() && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.GENERIC_GLYPH,
  },
  blackHoleCurr: {
    name: "Current Black Hole Speedup",
    multValue: () => MultiplierTabHelper.blackHoleSpeeds().current,
    isActive: () => BlackHole(1).isUnlocked && !BlackHoles.arePaused && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  blackHoleAvg: {
    name: "Average Black Hole Speedup",
    multValue: () => MultiplierTabHelper.blackHoleSpeeds().average,
    isActive: () => BlackHole(1).isUnlocked && !BlackHoles.arePaused && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  achievementMult: {
    name: "30 V-Achievement Milestone - Achievement Multiplier",
    multValue: () => Decimal.min(1e300, Decimal.pow(VUnlocks.achievementBH.effectOrDefault(1),
      BlackHoles.list.countWhere(bh => bh.isUnlocked))),
    isActive: () => !BlackHoles.arePaused && VUnlocks.achievementBH.canBeApplied && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.ACHIEVEMENT,
  },
  pulsing: {
    name: "Auto-Discharging Stored Time",
    multValue: () => (Enslaved.isAutoReleasing
      ? Decimal.max(Enslaved.autoReleaseSpeed.div(getGameSpeedupFactor()), 1)
      : getGameSpeedupFactor()),
    isActive: () => Enslaved.canRelease() && Enslaved.isAutoReleasing && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.BH_PULSE,
  },
  singularity: {
    name: "Singularity Milestone - Game speed based on Singularities",
    multValue: () => SingularityMilestone.gamespeedFromSingularities.effectOrDefault(1),
    isActive: () => SingularityMilestone.gamespeedFromSingularities.canBeApplied && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.SINGULARITY,
  },
  pelle: {
    name: "Pelle Upgrade - Repeatable Game speed",
    multValue: () => PelleUpgrade.timeSpeedMult.effectValue.toNumber(),
    isActive: () => Pelle.isDoomed && !EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.PELLE,
  },

  ec12: {
    name: "Eternity Challenge 12",
    multValue: () => new Decimal(0.001).div(getGameSpeedupForDisplay()),
    isActive: () => EternityChallenge(12).isRunning,
    icon: MultiplierTabIcons.CHALLENGE("eternity"),
  },
  chargingBH: {
    name: "Black Hole Charging",
    // The 0 in multValue is irrelevant; if this upgrade isn't available, the subtab is hidden by 1x total effect
    multValue: () => (Ra.unlocks.autoPulseTime.canBeApplied ? 0.01 : 0),
    isActive: () => Enslaved.isStoringGameTime,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  invertedBH: {
    name: "Inverted Black Hole",
    multValue: () => player.blackHoleNegative,
    isActive: () => BlackHoles.areNegative,
    icon: MultiplierTabIcons.CHALLENGE("eternity"),
  },
  nerfLaitela: {
    name: "Lai'tela's Reality",
    powValue: () => Decimal.clampMax(Time.thisRealityRealTime.totalMinutes.div(10), 1),
    isActive: () => Laitela.isRunning,
    icon: MultiplierTabIcons.GENERIC_LAITELA,
  },
  expoBlackHoles: {
    name: "Black Hole 3",
    powValue: () => ExpoBlackHole(1).power,
    isActive: () => ExpoBlackHole(1).isUnlocked,
    icon: MultiplierTabIcons.BLACK_HOLE,
  },
  CorruptionUpg: {
    name: "Corruption Upgrade - Spacetime Distortion",
    multValue: () => Decimal.pow10(Math.pow(1 + CorruptionData.corruptionChallenge.recordScore, 1/1.48)),
    isActive: () => player.mending.corruptionChallenge.corruptedMend ? Decimal.pow10(Math.pow(1 + player.mending.corruptionChallenge.recordScore, 0.25)) : Decimal.pow10(Math.pow(1 + player.mending.corruptionChallenge.recordScore, 1/1.48)),
    icon: MultiplierTabIcons.UPGRADE("corruption")
  },
  nerfCorruptions: {
    name: "Time Compression Hostility - Power Value",
    powValue: () => corruptionPenalties.timeCompression.power[player.mending.corruption[1]],
    isActive: () => (player.mending.corruptionChallenge.corruptedMend && player.mending.corruption[1] > 0),
    icon: MultiplierTabIcons.CORRUPTION,
  },
  nerfCorruptions2: {
    name: "Time Compression Hostility - Mult Value",
    multValue: () => corruptionPenalties.timeCompression.mult[player.mending.corruption[1]],
    isActive: () => (player.mending.corruptionChallenge.corruptedMend && player.mending.corruption[1] > 0),
    icon: MultiplierTabIcons.CORRUPTION,
  },
  nerfSoftcap: {
    name: "Game Speed Softcap",
    powValue: () => (getGameSpeedupFactor().log10() / getGameSpeedupFactor().div(1e300).pow(1 / 0.4321).times(1e300).log10()),
    isActive: () => getGameSpeedupFactor().gte(1e300),
    icon: MultiplierTabIcons.SOFTCAP("reality")
  }
};
