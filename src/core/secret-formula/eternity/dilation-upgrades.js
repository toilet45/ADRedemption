import { DC } from "../../constants";

function rebuyableCost(initialCost, increment, id) {
  return Decimal.multiply(initialCost, Decimal.pow(increment, player.dilation.rebuyables[id]));
}
function rebuyable(config) {
  return {
    id: config.id,
    cost: () => {
      if (player.dilation.rebuyables[config.id] > 5000) return rebuyableCost(config.initialCost, config.incrementSC, config.id);
      return rebuyableCost(config.initialCost, config.increment, config.id);
    },
    initialCost: config.initialCost,
    increment: config.increment,
    incrementSC: config.incrementSC,
    description: config.description,
    effect: () => config.effect(player.dilation.rebuyables[config.id]),
    formatEffect: config.formatEffect,
    formatCost: config.formatCost,
    purchaseCap: config.purchaseCap,
    pellePurchaseCap: config.pellePurchaseCap, //we now need a new pellePurchaseCap to uncap certain rebuyables depending on if you're in Pelle or not, thanks to Spec for the fix
    reachedCap: () =>{ 
      if (Pelle.isDoomed) return player.dilation.rebuyables[config.id] >= config.pellePurchaseCap;
      return player.dilation.rebuyables[config.id] >= config.purchaseCap;
    },
    pelleOnly: Boolean(config.pelleOnly),
    rebuyable: true
  };
}

export const dilationUpgrades = {
  dtGain: rebuyable({
    id: 1,
    initialCost: 1e4,
    increment: 10,
    incrementSC: 100,
    description: () =>
      ((SingularityMilestone.dilatedTimeFromSingularities.canBeApplied || Achievement(187).canBeApplied)
        ? `${formatX(2 * Effects.product(
          SingularityMilestone.dilatedTimeFromSingularities,
          Achievement(187)
        ), 2, 2)} Dilated Time gain`
        : "Double Dilated Time gain"),
    effect: bought => {
      const base = 2 * Effects.product(
        SingularityMilestone.dilatedTimeFromSingularities,
        Achievement(187)
      );
      return Decimal.pow(base, bought);
    },
    formatEffect: value => {
      const nonInteger = SingularityMilestone.dilatedTimeFromSingularities.canBeApplied ||
        Achievement(187).canBeApplied;
      return formatX(value, 2, nonInteger ? 2 : 0);
    },
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE,
    pellePurchaseCap: Number.MAX_VALUE,
  }),
  galaxyThreshold: rebuyable({
    id: 2,
    initialCost: 1e6,
    increment: 100,
    incrementSC: 100, //it shouldn't matter for this one
    description: () =>
      (Perk.bypassTGReset.isBought && !Pelle.isDoomed
        ? "Reset Tachyon Galaxies, but lower their threshold"
        : "Reset Dilated Time and Tachyon Galaxies, but lower their threshold"),
    // The 38th purchase is at 1e80, and is the last purchase.
    effect: bought => (bought < 38 ? Math.pow(0.8, bought) : 0),
    formatEffect: effect => {
      if (effect === 0) return `${formatX(getTachyonGalaxyMult(effect), 4, 4)}`;
      const nextEffect = effect === Math.pow(0.8, 37) ? 0 : 0.8 * effect;
      return `${formatX(getTachyonGalaxyMult(effect), 4, 4)} ➜
        Next: ${formatX(getTachyonGalaxyMult(nextEffect), 4, 4)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: 38,
    pellePurchaseCap: 38,
  }),
  tachyonGain: rebuyable({
    id: 3,
    initialCost: 1e7,
    increment: 20,
    incrementSC: 4000,
    description: () => {
      if (Pelle.isDoomed) return Ra.unlocks.placeholderP4.isUnlocked ? `Multiply the amount of Tachyon Particles gained by ${format(1.1, 1, 1)}` : `Multiply the amount of Tachyon Particles gained by ${formatInt(1)}`;
      if (Enslaved.isRunning) return `Multiply the amount of Tachyon Particles gained
      by ${Math.pow(3, Enslaved.tachyonNerf).toFixed(2)}`;
      return "Triple the amount of Tachyon Particles gained";
    },
    effect: bought => {
      if (Pelle.isDoomed) return Ra.unlocks.placeholderP4.isUnlocked ? Decimal.pow(1.1, bought) : DC.D1.pow(bought);
      return DC.D3.pow(bought);
    },
    formatEffect: value => formatX(value, 2, 2),
    formatCost: value => format(value, 2),
    purchaseCap: Number.MAX_VALUE, //cap at x1e2000
    pellePurchaseCap: Number.MAX_VALUE,
  }),
  doubleGalaxies: {
    id: 4,
    cost: 5e6,
    description: () => `Gain twice as many Tachyon Galaxies, up to ${formatInt(500)} base Galaxies`,
    effect: 2
  },
  tdMultReplicanti: {
    id: 5,
    cost: 1e9,
    description: () => {
      const rep10 = replicantiMult().pLog10();
      let multiplier = "0.1";
      if (rep10 > 9000) {
        const ratio = DilationUpgrade.tdMultReplicanti.effectValue.pLog10() / rep10;
        if (ratio < 0.095) {
          multiplier = ratio.toFixed(2);
        }
      }
      return `Time Dimensions are affected by Replicanti multiplier ${formatPow(multiplier, 1, 3)}, reduced
        effect above ${formatX(DC.E9000)}`;
    },
    effect: () => {
      let rep10 = replicantiMult().pLog10() * 0.1;
      rep10 = rep10 > 9000 ? 9000 + 0.5 * (rep10 - 9000) : rep10;
      return Decimal.pow10(rep10);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  ndMultDT: {
    id: 6,
    cost: 5e7,
    description: "Antimatter Dimension multiplier based on Dilated Time, unaffected by Time Dilation",
    effect: () => Currency.dilatedTime.value.pow(308).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  ipMultDT: {
    id: 7,
    cost: 2e12,
    description: "Gain a multiplier to Infinity Points based on Dilated Time",
    effect: () => Currency.dilatedTime.value.pow(1000).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  timeStudySplit: {
    id: 8,
    cost: 1e10,
    description: "You can buy all three Time Study paths from the Dimension Split"
  },
  dilationPenalty: {
    id: 9,
    cost: 1e11,
    description: () => `Reduce the Dilation penalty (${formatPow(1.05, 2, 2)} after reduction)`,
    effect: 1.05,
  },
  ttGenerator: {
    id: 10,
    cost: 1e15,
    description: "Generate Time Theorems based on Tachyon Particles",
    effect: () => Currency.tachyonParticles.value.div(20000),
    formatEffect: value => `${format(value, 2, 1)}/sec`
  },
  dtGainPelle: rebuyable({
    id: 11,
    initialCost: 1e14,
    increment: 100,
    incrementSC: 100, //these are hardcapped anyway
    pelleOnly: true,
    description: () =>{
      if(Pelle.isDoomed) return`${formatX(5)} Dilated Time gain`; 
      return `${formatX(1.75, 2, 2)} Dilated Time gain`;
    },
    effect: bought =>  {
      if (Pelle.isDoomed) return Decimal.pow(5, bought);
      return Decimal.pow(1.75, bought);
    },
    formatEffect: value => formatX(value, 2, 2),
    formatCost: value => format(value, 2),
    purchaseCap: 206, //cap at e50
    pellePurchaseCap: Number.MAX_VALUE,
  }),
  galaxyMultiplier: rebuyable({
    id: 12,
    initialCost: 1e15,
    increment: 1000,
    incrementSC: 1000,
    pelleOnly: true,
    description: "Multiply Tachyon Galaxies gained, applies after TG doubling upgrade",
    effect: bought => {
      let x = Ra.unlocks.twinTachyonGalaxyCapIncrease.isUnlocked ? (Math.min((Decimal.log10((Currency.dilatedTime.value.clampMin(1)))) / 25000, 2)) : 0;
      if (Pelle.isDoomed) return (bought * (1 + x)) + 1;
      return (bought * (1 + x) * 0.1) + 1;
    },
    formatEffect: value => {
      let x = Ra.unlocks.twinTachyonGalaxyCapIncrease.isUnlocked ? Math.floor((Decimal.log10(Currency.dilatedTime.value)) / 25000) : 0;
      if (Pelle.isDoomed) return `${formatX((value * (1 + x)), 2)} ➜ ${formatX((value * (1 + x)) + 1, 2, 2)}`;
      else if (player.dilation.rebuyables[12] >= 10) return `${formatX(value, 2, 2)}`;
      return `${formatX((value * (1 + x)), 2, 1, 2)} ➜ ${formatX((value * (1 + x)) + 0.1, 2, 2)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: 10,/*() =>{
      //let x = Ra.unlocks.twinTachyonGalaxyCapIncrease.isUnlocked ? Math.floor((Decimal.log10(Currency.dilatedTime.value)) / 100) : 0;
      return 10;// + x;
    },*/
    pellePurchaseCap: Number.MAX_VALUE,
  }),
  tickspeedPower: rebuyable({
    id: 13,
    initialCost: 1e16,
    increment: 1e4,
    incrementSC: 1e4,
    pelleOnly: true,
    description: "Gain a power to Tickspeed",
    effect: bought => {
      if (Pelle.isDoomed) return 1 + bought * 0.03;
      return 1 + bought * 0.02;
    },
    formatEffect: value =>{ 
      if (Pelle.isDoomed) return `${formatPow(value, 2, 2)} ➜ ${formatPow(value + 0.03, 2, 2)}`;
      else if(player.dilation.rebuyables[13] >= 10) return `${formatPow(value, 2, 2)}`;
      return `${formatPow(value, 2, 2)} ➜ ${formatPow(value + 0.02, 2, 2)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: 10,
    pellePurchaseCap: Number.MAX_VALUE,
  }),
  galaxyThresholdPelle: {
    id: 14,
    cost: 1e45,
    pelleOnly: true,
    get description () {
      return Pelle.isDoomed ? "Apply a cube root to the Tachyon Galaxy threshold" : "Apply a 1.1th root to the Tachyon Galaxy threshold";
    },
    effect: () => {
      if (Pelle.isDoomed) return 1/3;
      return 1/1.1;
    },
  },
  flatDilationMult: {
    id: 15,
    cost: 1e55,
    pelleOnly: true,
    description: () => `Gain more Dilated Time based on current EP`,
    effect: () => 1e9 ** Math.min((Math.max(player.eternityPoints.log10() - 1500, 0) / 2500) ** 1.2, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
};
