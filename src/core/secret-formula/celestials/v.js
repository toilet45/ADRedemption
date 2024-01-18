import { DC } from "../../constants";

// This is supposed to be in ./navigation.js but importing doesn't work for some stupid reason
function emphasizeEnd(fraction) {
  return Math.pow(fraction, 10);
}

export const V_REDUCTION_MODE = {
  SUBTRACTION: 1,
  DIVISION: 2
};

export const v = {
  // Note: mainUnlock IDs here are one-indexed to match with navigation indices
  mainUnlock: {
    realities: {
      id: 1,
      name: "Realities",
      resource: () => Currency.realities.value,
      requirement: 10000,
      format: x => formatInt(x),
      progress: () => Currency.realities.value / 10000,
    },
    eternities: {
      id: 2,
      name: "Eternities",
      resource: () => Currency.eternities.value,
      requirement: 1e70,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.eternities.value.pLog10() / 70),
    },
    infinities: {
      id: 3,
      name: "Infinities",
      resource: () => Currency.infinitiesTotal.value,
      requirement: 1e160,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.infinitiesTotal.value.pLog10() / 160),
    },
    dilatedTime: {
      id: 4,
      name: "Dilated Time",
      resource: () => player.records.thisReality.maxDT,
      requirement: DC.E320,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(player.records.thisReality.maxDT.pLog10() / 320),
    },
    replicanti: {
      id: 5,
      name: "Replicanti",
      resource: () => player.records.thisReality.maxReplicanti,
      requirement: DC.E320000,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(player.records.thisReality.maxReplicanti.pLog10() / 320000),
    },
    realityMachines: {
      id: 6,
      name: "Reality Machines",
      resource: () => Currency.realityMachines.value,
      requirement: 1e60,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.realityMachines.value.pLog10() / 60),
    },
  },
  runUnlocks: [
    {
      id: 0,
      name: "Glyph Knight",
      description: value => `Unlock Reality with at most ${quantifyInt("Glyph slot", -value)} filled.`,
      // This achievement has internally negated values since the check is always greater than
      values: [-5, -4, -3, -2, -1, 0],
      condition: () => V.isRunning && TimeStudy.reality.isBought,
      currentValue: () => -Glyphs.activeWithoutCompanion.length,
      formatRecord: x => (x >= -5 ? formatInt(-x) : "Not reached"),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 1,
      name: "AntiStellar",
      description: value => `Have ${formatInt(value)} total Galaxies from all types.`,
      values: [4000, 4300, 4600, 4900, 5200, 5500],
      condition: () => V.isRunning,
      currentValue: () => Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => Math.floor(300 * tiers),
      maxShardReduction: goal => goal - 4000,
      perReductionStep: 3,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 2,
      name: "Se7en deadly matters",
      description: value => `Get ${format(Decimal.pow10(value))} Infinity Points in Eternity Challenge 7.`,
      values: [6e5, 7.2e5, 8.4e5, 9.6e5, 1.08e6, 1.2e6],
      condition: () => V.isRunning && EternityChallenge(7).isRunning,
      currentValue: () => Currency.infinityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => 1.2e5 * tiers,
      maxShardReduction: goal => goal - 6e5,
      perReductionStep: DC.E1200,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 3,
      name: "Young Boy",
      description: value => `Get ${format(Decimal.pow10(value))} Antimatter in Eternity Challenge 12 without
        unlocking Time Dilation.`,
      values: [400e6, 450e6, 500e6, 600e6, 700e6, 800e6],
      condition: () => V.isRunning && EternityChallenge(12).isRunning && !PlayerProgress.dilationUnlocked(),
      currentValue: () => Currency.antimatter.value.log10(),
      formatRecord: x => format(Decimal.pow10(x)),
      shardReduction: tiers => 50e6 * tiers,
      maxShardReduction: goal => goal - 400e6,
      perReductionStep: DC.E500000,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 4,
      name: "Eternal Sunshine",
      description: value => `Get ${format(Decimal.pow10(value))} Eternity Points.`,
      values: [7000, 7600, 8200, 8800, 9400, 10000],
      condition: () => V.isRunning,
      currentValue: () => Currency.eternityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => 600 * tiers,
      maxShardReduction: goal => goal - 7000,
      perReductionStep: 1e6,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 5,
      name: "Matterception",
      description: value => `Get ${formatInt(value)} Dimension Boosts while Dilated and inside Eternity Challenge 5.`,
      values: [51, 52, 53, 54, 55, 56],
      condition: () => V.isRunning && player.dilation.active && EternityChallenge(5).isRunning,
      currentValue: () => DimBoost.purchasedBoosts,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => Math.floor(tiers),
      maxShardReduction: () => 5,
      reductionStepSize: 100,
      perReductionStep: 1,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 6,
      name: "Requiem for a Glyph",
      description: value => `Unlock Reality with at most ${formatInt(-value)} Glyphs equipped for the entire Reality.`,
      // This achievement has internally negated values since the check is always greater than
      values: [1, 4, 7, 10, 13],
      condition: () => V.isRunning && TimeStudy.reality.isBought,
      currentValue: () => -player.requirementChecks.reality.maxGlyphs,
      formatRecord: x => formatInt(-x),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isHard: true
    },
    {
      id: 7,
      name: "Post-destination",
      description: value => `Get ${formatInt(400000)} Time Theorems with a /${format(Decimal.pow10(value), 2, 2)}
        Black Hole or slower, without discharging or entering EC12.`,
      values: [100, 150, 200, 250, 300],
      condition: () => V.isRunning,
      currentValue: () => (
        // Dirty hack I know lmao
        Currency.timeTheorems.gte(400000)
          ? -Math.log10(player.requirementChecks.reality.slowestBH)
          : 0),
      formatRecord: x => `${formatInt(1)} / ${format(Math.pow(10, x))}`,
      shardReduction: tiers => 50 * tiers,
      maxShardReduction: goal => goal - 50,
      reductionStepSize: 2,
      perReductionStep: 10,
      mode: V_REDUCTION_MODE.DIVISION,
      isHard: true
    },
    {
      id: 8,
      name: "Shutter Glyph",
      description: value => `Reach a Glyph of level ${formatInt(value)}.`,
      values: [6500, 7000, 8000, 9000, 10000],
      condition: () => V.isRunning,
      currentValue: () => gainedGlyphLevel().actualLevel,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => Math.floor(500 * tiers),
      maxShardReduction: () => 500,
      perReductionStep: 5,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isHard: true
    },
    {
      id: 9,
      name: "No Need for Knowledge",
      description: value => `Get ${format(Decimal.pow10(value))} Eternity Points without any Time Studies.`,
      values: [8e9, 9e10, 1e12, 1.1e13, 1.2e14],
      condition: () => V.isRunning && player.requirementChecks.reality.maxStudies<=0,
      currentValue: () => Currency.eternityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      perReductionStep: 5,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isSuperHard: true
      //Reminder: ST gain is based on id, not isSuperHard. However isSuperHard is deciding whether it could be complete or not.
    },
    {
      id: 10,
      name: "Ultra Slow",
      description: value => `Get ${format(Decimal.pow10(value))} Antimatter while in Dilation and EC12.`,
      values: [1e14, 5e14, 1e15, 5e15, 1e16],
      condition: () => V.isRunning && player.dilation.active && EternityChallenge(12).isRunning,
      currentValue: () => Currency.antimatter.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      perReductionStep: 5,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isSuperHard: true
    },
    {
      id: 11,
      name: "Proof of Purity",
      description: value => `Get ${format(Decimal.pow10(value))} Infinity Points with at least 7 Cursed Glyph equipped and without any Triad Studies.`,
      values: [1e11, 2e12, 3e13, 4e14, 5e15],
      condition: () => V.isRunning && Glyphs.activeWithoutCompanion.filter(item => item.type==='cursed').length>=7 && player.requirementChecks.reality.noTriads,
      currentValue: () => Currency.infinityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      perReductionStep: 5,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isSuperHard: true
    },
    {
      id: 12,
      name: "Painful Roads",
      description: value => `Get ${format(Decimal.pow10(value))} Infinity Points without Triad study 305 and 307.`,
      values: [480, 600, 720, 840],
      condition: () => V.isSuperRunning && player.requirementChecks.reality.noTriad305 && player.requirementChecks.reality.noTriad307,
      currentValue: () => Currency.infinityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => 200*tiers,
      maxShardReduction: goal => goal - 480,
      perReductionStep: 1e2,
      mode: V_REDUCTION_MODE.DIVISION,
      isSuperHard: true
    },
    {
      id: 13,
      name: "Eternal Equipments",
      description: value => `Reach a Glyph of level ${formatInt(value)} with Eternities Glyph level factor weight at ${formatInt(100)}.`,
      values: [200, 300, 400, 500],
      condition: () => V.isSuperRunning && player.celestials.effarig.glyphWeights.eternities==100 && TimeStudy.reality.isBought,
      currentValue: () => gainedGlyphLevel().actualLevel,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => Math.floor(100*tiers),
      maxShardReduction: () => 5,
      perReductionStep: 1,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isSuperHard: true
    },
    {
      id: 14,
      name: "In and In and In",
      description: value => `Get ${format(Decimal.pow10(value))} Antimatter in Dilation, Eternity Challenge 3 and Infinity Challenge 8.`,
      values: [2500, 3000, 3500, 4500],
      condition: () => V.isSuperRunning && player.dilation.active && EternityChallenge(3).isRunning && InfinityChallenge(8).isRunning,
      currentValue: () => Currency.antimatter.value.log10(),
      formatRecord: x => format(Decimal.pow10(x)),
      shardReduction: tiers => 2500 * tiers,
      maxShardReduction: goal => goal - 2500,
      perReductionStep: new Decimal(1e25),
      mode: V_REDUCTION_MODE.DIVISION,
      isSuperHard: true
    },
    {
      id: 15,
      name: "Usage",
      description: value => `Get ${formatInt(value)} Time Theorems without Dilation glyph, Dilation unlocked and any Triad studies.`,
      values: [60000, 70000, 80000, 90000],
      condition: () => V.isSuperRunning && !PlayerProgress.dilationUnlocked() && Glyphs.activeWithoutCompanion.filter(item => item.type==='dilation').length==0 && player.requirementChecks.reality.noTriads,
      currentValue: () => Currency.timeTheorems.max.clampMax('1.7e308').toNumber(),
      formatRecord: x => formatInt(x),
      shardReduction: tiers => 50000 * tiers,
      maxShardReduction: goal => goal - 60000,
      perReductionStep: 500,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isSuperHard: true
    },
    {
      id: 16,
      name: "Do What Shouldn't Do",
      description: value => `Get ${formatInt(value)} Replicanti Galaxies.`,
      values: [40000, 42000, 44000, 46000],
      condition: () => V.isSuperRunning,
      currentValue: () => Replicanti.galaxies.total,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => 5000 * tiers,
      maxShardReduction: goal => goal - 34000,
      perReductionStep: 50,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isSuperHard: true
    },
    {
      id: 17,
      name: "Dying to Survive",
      description: value => `Get ${format(Decimal.pow10(value))} Eternity Points with 8 cursed glyphs.`,
      values: [125, 1500, 2750, 4000],
      condition: () => V.isSuperRunning && Glyphs.activeWithoutCompanion.filter(item => item.type==='cursed').length==8,
      currentValue: () => Currency.eternityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => 2500 * tiers,
      maxShardReduction: goal => goal - 125,
      perReductionStep: 1e25,
      mode: V_REDUCTION_MODE.DIVISION,
      isSuperHard: true
    }
  ],
  unlocks: {
    vAchievementUnlock: {
      id: 0,
      reward: "Unlock V, The Celestial Of Achievements",
      description: "Meet all the above requirements simultaneously",
      requirement: () => Object.values(GameDatabase.celestials.v.mainUnlock).every(e => e.progress() >= 1)
    },
    shardReduction: {
      id: 1,
      reward: `You can spend Perk Points to reduce the goal requirement of all tiers of each V-Achievement.`,
      description: () => `Have ${formatInt(2)} V-Achievements`,
      requirement: () => V.spaceTheorems >= 2
    },
    adPow: {
      id: 2,
      reward: "Antimatter Dimension power based on total Space Theorems.",
      description: () => `Have ${formatInt(5)} V-Achievements`,
      effect: () => 1 + Math.sqrt(V.spaceTheorems) / 100, //this should be about ^1.13
      format: x => formatPow(x, 3, 3),
      requirement: () => V.spaceTheorems >= 5
    },
    fastAutoEC: {
      id: 3,
      reward: "Achievement multiplier reduces Auto-EC completion time.",
      description: () => `Have ${formatInt(10)} V-Achievements`,
      effect: () => Achievements.power,
      // Base rate is 60 ECs at 20 minutes each
      format: x =>{
        if (MendingUpgrade(3).isBought) return "Instant (Mending Upgrade 3)";
        else if (Ra.unlocks.instantECAndRealityUpgradeAutobuyers.canBeApplied) return "Instant (Ra upgrade)";
        return `${TimeSpan.fromMinutes(60 * 20 / x.toNumber()).toStringShort()} for full completion`;
      },
      requirement: () => V.spaceTheorems >= 10
    },
    autoAutoClean: {
      id: 4,
      reward: "Unlock the ability to Automatically Purge Glyphs on Reality.",
      description: () => `Have ${formatInt(16)} V-Achievements`,
      requirement: () => V.spaceTheorems >= 16
    },
    achievementBH: {
      id: 5,
      reward: "Achievement multiplier affects Black Hole power.",
      description: () => `Have ${formatInt(30)} V-Achievements`,
      effect: () => Achievements.power,
      format: x => formatX(x, 2, 0),
      requirement: () => V.spaceTheorems >= 30
    },
    raUnlock: {
      id: 6,
      reward() {
        return `Reduce the Space Theorem cost of Time Studies by ${formatInt(2)}.
                Unlock Ra, Celestial of the Forgotten.`;
      },
      description: () => `Have ${formatInt(36)} V-Achievements`,
      effect: 2,
      requirement: () => V.spaceTheorems >= 36
    },
    vAchMulti: {
      id: 7,
      reward() {
        return `Extra Achievements Multiplier based on total space theorems.`;
      },
      description: () => `Have ${formatInt(210)} V-Achievements`,
      effect: () => Decimal.pow(V.spaceTheorems,2).clampMin(1).toNumber(),
      format: x => formatX(x, 2, 2),
      requirement: () => V.spaceTheorems >= 210 && Ra.unlocks.unlockSHardV.isUnlocked
    },
    vAchRa: {
      id: 8,
      reward() {
        return `Total space theorems now boosts Ra's memory gain.`;
      },
      description: () => `Have ${formatInt(300)} V-Achievements`,
      effect: () => Math.max(V.spaceTheorems/50,1),
      format: x => formatX(x, 2, 2),
      requirement: () => V.spaceTheorems >= 300 && Ra.unlocks.unlockSHardV.isUnlocked
    },
    vKeep: {
      id: 9,
      reward() {
        return `Keep all V progress on Mend.`;
      },
      description: () => `Have ${formatInt(390)} V-Achievements`,
      effect: 1,
      requirement: () => V.spaceTheorems >= 390 && Ra.unlocks.unlockSHardV.isUnlocked
    }
  }
};
