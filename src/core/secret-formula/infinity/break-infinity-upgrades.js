import { DC } from "../../constants";

function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost * Math.pow(config.costIncrease, player.infinityRebuyables[config.id]),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.infinityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect ||
      (value => {
        const afterECText = config.afterEC ? config.afterEC() : "";
        return value === config.maxUpgrades
          ? `Currently: ${formatX(10 - value)} ${afterECText}`
          : `Currently: ${formatX(10 - value)} | Next: ${formatX(10 - value - 1)}`;
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakInfinityUpgrades = {
  totalAMMult: {
    id: "totalMult",
    cost: 1e4,
    description: "Antimatter Dimensions gain a multiplier based on total antimatter produced",
    effect: () => Math.pow(player.records.totalAntimatter.exponent + 1, 0.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () =>
        `Antimatter Dimensions gain a power effect based on total antimatter and Teresa level`,
      effect: () => 1 +
                    Math.log(1+Math.log10(player.records.totalAntimatter.exponent)) *
                    Math.pow(Ra.pets.teresa.level, 0.2) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  currentAMMult: {
    id: "currentMult",
    cost: 5e4,
    description: "Antimatter Dimensions gain a multiplier based on current antimatter",
    effect: () => Math.pow(Currency.antimatter.exponent + 1, 0.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () =>
        `Antimatter Dimensions gain a power effect based on current antimatter and Teresa level`,
      effect: () => 1 +
                    Math.log(Math.log10(Currency.antimatter.exponent)) *
                    Math.pow(Ra.pets.teresa.level, 0.2) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  galaxyBoost: {
    id: "postGalaxy",
    cost: 5e11,
    description: () => `All Galaxies are ${formatPercents(0.5)} stronger`,
    effect: 1.5,
    charged: {
      description: () => `All Galaxies are ${formatPercents(0.66667, 2)} stronger`,
      effect: 1.66667
    }
  },
  infinitiedMult: {
    id: "infinitiedMult",
    cost: 1e5,
    description: "Antimatter Dimensions gain a multiplier based on Infinities",
    effect: () => 1 + Currency.infinitiesTotal.value.pLog10() * 10,
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "Raise TS31's exponent based on Teresa Level and Infinities",
      effect: () => Math.max(1 + (Currency.infinitiesTotal.value.pLog10() / 10000) * Math.pow(Ra.pets.teresa.level, 0.2) / 150, 1),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  achievementMult: {
    id: "achievementMult",
    cost: 1e6,
    description: "Additional multiplier to Antimatter Dimensions based on Achievements completed",
    effect: () => Math.max(Math.pow((Achievements.effectiveCount - 30), 3) / 40, 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "Raise Achievement Multiplier based on Teresa and V Level",
      effect: () => Math.max(1 + Math.pow(Ra.pets.teresa.level + Ra.pets.v.level, 0.25) / 7.5, 1),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  slowestChallengeMult: {
    id: "challengeMult",
    cost: 1e7,
    description: "Antimatter Dimensions gain a multiplier based on slowest challenge run",
    effect: () => Decimal.clampMin(Time.worstChallenge.totalMinutes.times(0.02), 1),
    formatEffect: value => formatX(value, 2, 2),
    hasCap: true,
    cap: DC.D3E4,
    charged: {
      description: "Raise IC1 Reward based on Teresa Level",
      effect: () => Ra.pets.teresa.level * 1e9,
      formatEffect: value => formatPow(value)
    }
  },
  infinitiedGen: {
    id: "infinitiedGeneration",
    cost: 2e7,
    description: "Passively generate Infinities based on your fastest Infinity",
    effect: () => player.records.bestInfinity.time,
    formatEffect: value => {
      if (value === Number.MAX_VALUE && !Pelle.isDoomed) return "No Infinity generation";
      let infinities = DC.D1;
      infinities = infinities.timesEffectsOf(
        RealityUpgrade(5),
        RealityUpgrade(7),
        Ra.unlocks.continuousTTBoost.effects.infinity
      );
      infinities = infinities.times(getAdjustedGlyphEffect("infinityinfmult"));
      const timeStr = Time.bestInfinity.totalMilliseconds.lte(50)
        ? `${TimeSpan.fromMilliseconds(100).toStringShort()} (capped)`
        : `${Time.bestInfinity.times(2).toStringShort()}`;
      return `${quantify("Infinity", infinities)} every ${timeStr}`;
    },
    charged: {
      description: "Remove the Reality hardcap from The Knowing Existence and raise Uncountability based on Teresa Level",
      effect: () => Math.max(Math.pow(Ra.pets.teresa.level, 0.5), 1),
      formatEffect: value => formatPow(value, 2, 2)
    }
  },
  autobuyMaxDimboosts: {
    id: "autobuyMaxDimboosts",
    cost: 5e9,
    description: "Unlock the buy max Dimension Boost Autobuyer mode",
    charged: {
      description: "Multiply free Dimension Boost amount based on Teresa Level",
      effect: () => Math.pow(Ra.pets.teresa.level, 0.5),
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  autobuyerSpeed: {
    id: "autoBuyerUpgrade",
    cost: 1e15,
    description: "Autobuyers unlocked or improved by Normal Challenges work twice as fast",
    charged: {
      description: "Increase Continuum Purchases based on Teresa and Lai'tela Level",
      effect: () => Math.max((Ra.pets.teresa.level + Ra.pets.laitela.level) / 125, 1),
      formatEffect: value => `+${formatPercents(value, 2, 2)}`
    }
  },
  tickspeedCostMult: rebuyable({
    id: 0,
    initialCost: 1e6,
    costIncrease: 5,
    maxUpgrades: 8,
    description: "Reduce post-infinity Tickspeed Upgrade cost multiplier scaling",
    afterEC: () =>{
      if (MendingUpgrade(8).isBought) return `After Mending Upgrade 8: ${formatX(1.2, 2, 2)}`
      if (EternityChallenge(11).completions > 0) return `After EC11: ${formatX(2 - (0.07 * EternityChallenge(11).completions), 2, 2)}`
      return ""
    },
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate()
  }),
  dimCostMult: rebuyable({
    id: 1,
    initialCost: 1e7,
    costIncrease: 5e3,
    maxUpgrades: 7,
    description: "Reduce post-infinity Antimatter Dimension cost multiplier scaling",
    afterEC: () =>{
      if (MendingUpgrade(8).isBought) return `After Mending Upgrade 8: ${formatX(1.5, 2, 2)}`
      if (EternityChallenge(6).completions > 0) return `After EC6: ${formatX(3 - (0.2 * EternityChallenge(6).completions), 2, 2)}`
      return ""
    },
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate()
  }),
  ipGen: rebuyable({
    id: 2,
    initialCost: 1e7,
    costIncrease: 10,
    maxUpgrades: 10,
    effect: value => Player.bestRunIPPM.times(value / 20),
    description: () => {
      let generation = `Generate ${formatInt(5 * player.infinityRebuyables[2])}%`;
      if (!BreakInfinityUpgrade.ipGen.isCapped) {
        generation += ` ➜ ${formatInt(5 * (1 + player.infinityRebuyables[2]))}%`;
      }
      return `${generation} of your best IP/min from your last 10 Infinities`;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} IP/min`,
    noLabel: false
  })
};
