import { DC } from "../../constants";

const specialInfinityGlyphDisabledEffectText = () => (PelleRifts.chaos.milestones[1].canBeApplied
  ? "The Pelle-Specific effect from Infinity Glyphs is also disabled."
  : "");

export const eternityChallenges = [
  {
    id: 1,
    description: "Time Dimensions are disabled.",
    goal: DC.E1800,
    goalIncrease: DC.E200,
    reward: {
      description: "Time Dimension multiplier based on time spent this Eternity",
      effect: completions =>
        {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(1);
          return Decimal.pow(Decimal.max(player.records.thisEternity.time.div(10), 0.9), 0.3 + (completions * 0.05))
        },
      formatEffect: value => formatX(value, 2, 1),
    },
    vReward:{
      description: `⌬ Time Dimension power based on real time spent this Mend ⌬`,
      effect: () => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return Math.min(0.5, (Math.log10(player.records.thisMend.realTime + 1) / 100)) * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600) + 1
      },
      formatEffect: value => formatPow(value, 2, 3),
    },
    // These will get notation-formatted and scrambled between for the final goal
    scrambleText: ["1e2600", "1e201600"],
  },
  {
    id: 2,
    description: "Infinity Dimensions are disabled.",
    goal: DC.E975,
    pelleGoal: DC.E1750,
    goalIncrease: DC.E175,
    reward: {
      description: "1st Infinity Dimension multiplier based on Infinity Power",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(1);
        return Currency.infinityPower.value.pow(1.5 / (700 - completions * 100)).clampMin(1)},
      cap: DC.E100,
      formatEffect: value => formatX(value, 2, 1),
    },
    vReward:{
      description: `⌬ Infinity Dimension power based on Infinity Power ⌬`,
      effect: () => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 + (Math.log10(Math.max(Currency.infinityPower.value.clampMin(1).log10(), 1)) / 500) * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600)},
      formatEffect: value => formatPow(value, 2, 3)
    }
  },
  {
    id: 3,
    description: "Antimatter Dimensions 5-8 don't produce anything. Dimensional Sacrifice is disabled.",
    goal: DC.E600,
    pelleGoal: DC.E925,
    goalIncrease: DC.E75,
    reward: {
      description: () => `Increase the multiplier for buying ${formatInt(10)} Antimatter Dimensions`,
      effect: completions => { if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 0;
        return completions * 0.72},
      formatEffect: value => `+${format(value, 2, 2)}`,
    },
    vReward:{
      description: `⌬ All per-purchase multipliers raised ⌬`,
      formatEffect: value => `${formatPow(value, 3, 3)}`,
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 + (0.0005 * completions * ((Ra.pets.v.level - 25) / 75) + V.spaceTheorems / 600)},
    }
  },
  {
    id: 4,
    description: `all Infinity multipliers and generators are disabled. The goal must be reached within a certain
      number of Infinities or else you will fail the Challenge.`,
    goal: DC.E2750,
    goalIncrease: DC.E550,
    restriction: completions => Math.max(16 - 4 * completions, 0),
    checkRestriction: restriction => Currency.infinities.lte(restriction),
    formatRestriction: restriction => (restriction === 0
      ? "without any Infinities"
      : `in ${quantifyInt("Infinity", restriction)} or less`),
    failedRestriction: "(Too many Infinities for more)",
    reward: {
      description: "Infinity Dimension multiplier based on unspent IP",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(1);
        return Currency.infinityPoints.value.pow(0.003 + completions * 0.002)
      },
      cap: DC.E200,
      formatEffect: value => formatX(value, 2, 1),
    },
    vReward:{
      description: `⌬ All Dimension power based on Multiversal Remains ⌬`,
      effect: () => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 + (Decimal.log10(Currency.mendingPoints.value.add(1)) / 250) / 10 * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600)},
      formatEffect: value => formatPow(value, 3, 3),
    }
  },
  {
    id: 5,
    description: () => `Antimatter Galaxy cost increase scaling starts immediately (normally at ${formatInt(100)}
      Galaxies). Dimension Boost costs scaling is massively increased.`,
    goal: DC.E750,
    pelleGoal: DC.E1400,
    goalIncrease: DC.E400,
    reward: {
      description: "Distant Galaxy cost scaling starts later",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 0;
        return completions * 5},
      formatEffect: value => `${formatInt(value)} AG later`,
    },
    vReward:{
      description: `⌬ Obscure Galaxy scaling starts later ⌬`,
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 0;
        return 500 * completions * ((Ra.pets.v.level - 25) / 75)},
      formatEffect: value => `${formatInt(value)} AG later`,
    }
  },
  {
    id: 6,
    // The asterisk, if present, will get replaced with strings generated from the scramble text
    description: () => {
      if (Enslaved.isRunning) return "you *. The cost of upgrading your max Replicanti Galaxies is massively reduced.";
      return "you cannot gain Antimatter Galaxies normally. The cost of upgrading your max Replicanti" +
              " Galaxies is massively reduced.";
    },
    goal: DC.E850,
    pelleGoal: DC.E1500,
    goalIncrease: DC.E250,
    reward: {
      description: "Further reduce Antimatter Dimension cost multiplier growth",
      effect: completions => completions * 0.2,
      formatEffect: value => {
        if(MendingUpgrade(8).isBought) return `${formatX(1.5, 2, 2)} (Mending Upgrade 8)`
        const total = Math.round(Player.dimensionMultDecrease + Effects.sum(EternityChallenge(6).reward)) - value;
        return `-${format(value, 2, 1)} (${formatX(total, 2, 1)} total)`;
      }
    },
    vReward:{
      description: `⌬ Continuum multiplier ⌬`,
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 + (0.01 * completions) * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600)},
      formatEffect: value => `${formatX(value, 2, 2)}`
    },
    scrambleText: ["cannot gain Antimatter Galaxies normally", "c㏰'퐚 gai鸭 Anti꟢at랜erﻪﶓa⁍axie㮾 䂇orma㦂l"],
  },
  {
    id: 7,
    description:
      "1st Time Dimensions produce 8th Infinity Dimensions and 1st Infinity Dimensions produce " +
      "7th Antimatter Dimensions. Tickspeed also directly applies to Infinity and Time Dimensions.",
    goal: DC.E2000,
    pelleGoal: DC.E2700,
    goalIncrease: DC.E530,
    effect: () => TimeDimension(1).productionPerSecond,
    reward: {
      description: "1st Time Dimension produces 8th Infinity Dimensions",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(0);
        return TimeDimension(1).productionPerSecond.pow(completions * 0.2).minus(1).clampMin(0)},
      formatEffect: value => `${format(value, 2, 1)} per second`,
    },
    vReward:{
      description: "⌬ 1st Dark Matter Dimension produces 8th Time dimension ⌬",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(0);
        return DarkMatterDimension(1).powerDM.times(1000).div(DarkMatterDimension(1).interval).pow(0.2 * completions).minus(1).clampMin(0).mul((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600)},
      formatEffect: value => `${format(value, 2, 2)} per second`,
    }
  },
  {
    id: 8,
    description: () => `you can only upgrade Infinity Dimensions ${formatInt(50)} times and Replicanti
      upgrades ${formatInt(40)} times. Infinity Dimension and Replicanti upgrade autobuyers are disabled.`,
    goal: DC.E1300,
    pelleGoal: DC.E2800,
    goalIncrease: DC.E900,
    reward: {
      description: "Infinity Power strengthens Replicanti Galaxies",
      effect: completions => {
        if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 0;
        const infinityPower = Math.log10(Currency.infinityPower.value.pLog10() + 1);
        return Math.max(0, Math.pow(infinityPower, 0.03 * completions) - 1);
      },
      formatEffect: value => formatPercents(value, 2)
    },
    vReward: {
      description: "⌬ Time Shards strengthen all Galaxy types ⌬",
      effect: completions => {
        if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 0;
        const timeShards = Math.log10(Currency.timeShards.value.pLog10() + 1);
        return Math.max(0, (Math.pow(timeShards, 0.03 * completions) - 1) * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600) / 10);
      },
      formatEffect: value => formatPercents(value, 2)
    }
  },
  {
    id: 9,
    description: () => `you cannot buy Tickspeed upgrades. Infinity Power instead multiplies
      Time Dimensions with greatly reduced effect. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E1750,
    pelleGoal: DC.E2900,
    goalIncrease: DC.E250,
    reward: {
      description: "Infinity Dimension multiplier based on Time Shards",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(1);
        return Currency.timeShards.value.pow(completions * 0.1).clampMin(1)},
      cap: DC.E400,
      formatEffect: value => formatX(value, 2, 1)
    },
    vReward:{
      description: "⌬ Infinity Dimension multiplier based on Tickspeed upgrade counts ⌬",
      effect: () => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(1);
        return Decimal.pow(10, new Decimal(Tickspeed.totalUpgrades).times((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600).div(10)).clampMin(1)},
      formatEffect: value => formatX(value, 3, 3)
    }
  },
  {
    id: 10,
    description: () => {
      let description = `Time Dimensions and Infinity Dimensions are disabled. You gain an immense boost from
        Infinities to Antimatter Dimensions (Infinities${formatPow(950)}). ${specialInfinityGlyphDisabledEffectText()}`;
      EternityChallenge(10).applyEffect(v => description += ` Currently: ${formatX(v, 2, 1)}`);
      return description;
    },
    goal: DC.E3000,
    pelleGoal: DC.E3200,
    goalIncrease: DC.E300,
    effect: () => Decimal.pow(Currency.infinitiesTotal.value, 950).clampMin(1).pow(TimeStudy(31).effectOrDefault(1)),
    reward: {
      description: "Time Dimension multiplier based on Infinities",
      effect: completions => {
        if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return new Decimal(1);
        const mult = Currency.infinitiesTotal.value.times(2.783e-6).pow(0.4 + 0.1 * completions).clampMin(1);
        return mult.powEffectOf(TimeStudy(31));
      },
      formatEffect: value => {
        if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return "×1.0";
        // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
        const mult = formatX(value, 2, 1);
        return TimeStudy(31).canBeApplied
          ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (After TS31: ${mult})`
          : mult;
      }
    },
    vReward:{
      description: "⌬ Time Dimension power based on Infinities ⌬",
      effect: () => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 + (Decimal.log10(Currency.infinities.value.add(1)) / 500000  * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600))},
      formatEffect: value => `${formatPow(value, 3, 3)}`
    }
  },
  {
    id: 11,
    description: () => `all Dimension multipliers and powers are disabled except for the multipliers from
      Infinity Power and Dimension Boosts (to Antimatter Dimensions). ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E450,
    pelleGoal: DC.E11200,
    goalIncrease: DC.E200,
    pelleGoalIncrease: DC.E1400,
    reward: {
      description: "Further reduce Tickspeed cost multiplier growth",
      effect: completions => completions * 0.07,
      formatEffect: value => {
        if(MendingUpgrade(8).isBought) return `${formatX(1.2, 2, 2)} (Mending Upgrade 8)`
        const total = Math.round(Player.tickSpeedMultDecrease + Effects.sum(EternityChallenge(11).reward)) - value;
        return `-${format(value, 2, 2)} (${formatX(total, 2, 2)} total)`;
      }
    },
    vReward:{
      description: "⌬ Reduce free Tickspeed upgrade scaling ⌬",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 - (0.0005 * completions) * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600)},
      formatEffect: value => `${formatPow(value, 3, 3)}`
    }
  },
  {
    id: 12,
    description: () => (PlayerProgress.realityUnlocked()
      ? `the game runs ×${formatInt(1000)} slower; all other game speed effects are disabled. The goal must be reached
        within a certain amount of time or you will fail the Challenge. ${specialInfinityGlyphDisabledEffectText()}`
      : `the game runs ×${formatInt(1000)} slower. The goal must be reached
        within a certain amount of time or you will fail the Challenge.`),
    goal: DC.E110000,
    pelleGoal: DC.E208000,
    goalIncrease: DC.E12000,
    restriction: completions => Math.max(10 - 2 * completions, 1) / 10,
    checkRestriction: restriction => Time.thisEternity.totalSeconds.lt(restriction),
    formatRestriction: restriction => `in ${quantify("in-game second", restriction, 0, 1)} or less.`,
    failedRestriction: "(Too slow for more)",
    reward: {
      description: "Infinity Dimension cost multipliers are reduced",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return 1 - completions * 0.008},
      formatEffect: value => `x${formatPow(value, 3, 3)}`
    },
    vReward:{
      description: "⌬ Increase Infinity Dimension caps ⌬",
      effect: completions => {if (player.mending.corruptionChallenge.corruptedMend&&player.mending.corruption[9]>=8) return 1;
        return Math.max(1, 1/(1-(0.008 * completions) * ((Ra.pets.v.level - 25) / 75 + V.spaceTheorems / 600)))},
      formatEffect: value => `${formatPow(value, 3, 3)}`
    }
  }
];
