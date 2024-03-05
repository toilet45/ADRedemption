import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.infinity.kohlerRebuyables[props.id],
    1e30,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect, effectType } = props;
  props.effect = () =>{ 
    if (props.effectType === "+" || props.effectType === "-"){
      return effect * player.infinity.kohlerRebuyables[props.id];
    }
    return Math.pow(effect, player.infinity.kohlerRebuyables[props.id]);
  }
  props.description = () => props.textTemplate.replace("{value}", format(effect, 2, 2));
  props.formatEffect = value => {
    if (props.id === 4) return effectType + `${format(value, 2, 2)}`
    /*if (props.id === 11) return effectType + `${formatFloat(value, 3)}`*/
    return effectType + `${format(value, 2, 0)}`
  };
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const kohlerInfinityUpgrades = [
  rebuyable({
    id: 1,
    name: "Kohler Infinity Upgrade 1",
    initialCost: 10,
    costMult: 50,
    textTemplate: `Multiply Infinity Point gain by {value} after softcaps`,
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 2,
    name: "Kohler Infinity Upgrade 2",
    initialCost: 1e8,
    costMult: 100,
    textTemplate: "Multiply Infinity Dimensions by {value} after softcaps",
    effect: 5,
    effectType: "×"
  }),
  rebuyable({
    id: 3,
    name: "Kohler Infinity Upgrade 3",
    initialCost: 1e10,
    costMult: 1e4,
    textTemplate: `Multiply Infinity gain by {value}`,
    effect: 2,
    effectType: "×"
  }),
  rebuyable({
    id: 4,
    name: "Kohler Infinity Upgrade 4",
    initialCost: 1e11,
    costMult: 1e6,
    textTemplate: `Raise Infinity Power conversion rate by {value}`,
    effect: 1.05,
    effectType: "^"
  }),
  rebuyable({
    id: 5,
    name: "Kohler Infinity Upgrade 5",
    initialCost: 1e300,
    costMult: 1e300,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "×"
  }),
 {
  id: 6,
  name: "Kohler Infinity Upgrade 6",
  cost: 50000,
  description: () => `Infinity Dimension antimatter requirements ${formatPow(0.5, 1, 1)} and costs /${format(1000)}`,
 }, 
 {
  id: 7,
  name: "Kohler Infinity Upgrade 7",
  cost: 1e7,
  description: () => `Infinity Dimension multiplier to Antimatter Dimensions applies again after Kohler nerfs at a reduced rate`,
  effect: () => Currency.infinityPower.value.pow(InfinityDimensions.powerConversionRate).pow(0.1).clampMin(1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 8,
  name: "Kohler Infinity Upgrade 8",
  cost: 5e7,
  description: () => `Multiplier to Infinity Dimensions based on amount of completed Infinity Challenges`,
  effect: () => Math.pow(200, InfinityChallenges.completed.length),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 9,
  name: "Kohler Infinity Upgrade 9",
  cost: 1e8,
  description: () => `Base Distant Galaxy Scaling starts at ${formatInt(20000)} Galaxies`
 },
 {
  id: 10,
  name: "Kohler Infinity Upgrade 10",
  cost: 1e9,
  description: () => `Unlock Matter Upgrades and Infinity Challenge 9`
 },
 {
  id: 11,
  name: "Kohler Infinity Upgrade 11",
  cost: 1e11,
  description: () => `Kohler Infinity Upgrade 7 also applies to the 1st Antimatter Dimension`,
  effect: () => Currency.infinityPower.value.pow(InfinityDimensions.powerConversionRate).pow(0.1).clampMin(1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 12,
  name: "Kohler Infinity Upgrade 12",
  cost: 1e12,
  description: () => `Gamespeed boosts Infinity Point Gain`,
  effect: () => getGameSpeedupFactor().log10(),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 13,
  name: "Kohler Infinity Upgrade 13",
  cost: 1e14,
  description: () => `Matter Gain is boosted by Infinity Points`,
  effect: () => Currency.infinityPoints.value.log10() / 2,
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2)   
 },
 {
  id: 14,
  name: "Kohler Infinity Upgrade 14",
  cost: 1e15,
  description: () => `Infinity Power multiplier to Antimatter Dimensions affect Infinity Point gain at a reduced rate`,
  effect: () => Math.max(1, Currency.infinityPower.value.pow(InfinityDimensions.powerConversionRate).log10() / 100),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 15,
  name: "Kohler Infinity Upgrade 15",
  cost: 1e300,
  description: () => `???`
 }
];
