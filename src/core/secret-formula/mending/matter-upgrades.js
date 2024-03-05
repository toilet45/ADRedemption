import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.infinity.matterRebuyables[props.id],
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
      return effect * player.infinity.matterRebuyables[props.id];
    }
    return Math.pow(effect, player.infinity.matterRebuyables[props.id]);
  }
  props.description = () => props.textTemplate.replace("{value}", format(effect, 2, 2));
  props.formatEffect = value => {
    if (props.id === 2) return effectType + `${format(value, 2, 2)}`
    /*if (props.id === 11) return effectType + `${formatFloat(value, 3)}`*/
    return effectType + `${format(value, 2, 0)}`
  };
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const matterUpgrades = [
  rebuyable({
    id: 1,
    name: "Matter Upgrade 1",
    initialCost: 100,
    costMult: 1e3,
    textTemplate: `Multiply Matter gain by {value} in Infinity Challenge 9`,
    effect: 2,
    effectType: "×"
  }),
  rebuyable({
    id: 2,
    name: "Matter Upgrade 2",
    initialCost: 1e8,
    costMult: 1e4,
    textTemplate: `Raise Matter gain by {value}`,
    effect: 1.05,
    effectType: "^"
  }),
  rebuyable({
    id: 3,
    name: "Matter Upgrade 3",
    initialCost: 1e300,
    costMult: 1e300,
    textTemplate: `[TBD]`,
    effect: 1,
    effectType: "×"
  }),
  rebuyable({
    id: 4,
    name: "Matter Upgrade 4",
    initialCost: 1e300,
    costMult: 1e300,
    textTemplate: `[TBD]`,
    effect: 1,
    effectType: "×"
  }),
  rebuyable({
    id: 5,
    name: "Matter Upgrade 5",
    initialCost: 1e300,
    costMult: 1e300,
    textTemplate: `[TBD]`,
    effect: 1,
    effectType: "×"
  }),
 {
  id: 6,
  name: "Matter Upgrade 6",
  cost: 1e5,
  description: () => `Best Matter in Infinity Challenge 9 boosts Infinity Point gain`,
  effect: () => Math.max(1, player.records.bestMatterinIC9.log10() * 10),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 }, 
 {
  id: 7,
  name: "Matter Upgrade 7",
  cost: 1e6,
  description: () => `Matter gain is boosted based on Infinity Challenge 1 reward`,
  effect: () => InfinityChallenge(1).reward.config.effect().times(10),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 }, 
 {
  id: 8,
  name: "Matter Upgrade 8",
  cost: 5e6,
  description: () => `Best Matter in IC9 boosts Infinity Dimension multiplier`,
  effect: () => player.records.bestMatterinIC9.clampMin(1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 }, 
 {
  id: 9,
  name: "Matter Upgrade 9",
  cost: 2.5e7,
  description: () => `1st Antimatter Dimension multiplier boosts Matter gain`,
  effect: () => AntimatterDimension(1).multiplier.clampMin(1).log10() / 10,
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },  
 {
  id: 10,
  name: "Matter Upgrade 10",
  cost: 1e9,
  description: () => `Best Matter in IC9 boosts Antimatter Exponent`,
  effect: () => 1 + (player.records.bestMatterinIC9.log10() / 50),
  effectType: "^",
  formatEffect: value => formatPow(value, 2, 2) 
 }, 
];
