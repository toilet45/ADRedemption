import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.infinity.matterRebuyables[props.id],
    1e30,
    1e15 * props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e50,
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
    if (props.id === 2 || props.id === 4) return effectType + `${format(value, 2, 2)}`
    if (props.id === 12) return effectType + `${formatInt(value)}`
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
    initialCost: 1e9,
    costMult: 1e5,
    textTemplate: `Multiply Gamespeed in Infinity Challenge 9 by {value}`,
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 4,
    name: "Matter Upgrade 4",
    initialCost: 1e11,
    costMult: 1e7,
    textTemplate: `Raise Infinity Point gain by {value}`,
    effect: 1.1,
    effectType: "^"
  }),
  rebuyable({
    id: 5,
    name: "Matter Upgrade 5",
    initialCost: 1e12,
    costMult: 1e10,
    textTemplate: `Multiply Kohler Point gain by {value}`,
    effect: 5,
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
 {
  id: 11,
  name: "Matter Upgrade 11",
  cost: 5e9,
  description: () => `Total Antimatter boosts Matter gain`,
  effect: () => Math.max(Math.log(Math.max(player.records.totalAntimatter.log10(), 1)), 1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 12,
  name: "Matter Upgrade 12",
  cost: 1e11,
  description: () => `Gain free Galxies based on best Matter`,
  effect: () => {
    let x = player.records.bestMatterinIC9.log10()
    if (x > 50){
      x /= 50;
      x = x ** 0.25;
      x *= 50;
    }
    return Math.floor(x);
  },
  effectType: "+",
  formatEffect: value => formatInt(value) 
 },
 {
  id: 13,
  name: "Matter Upgrade 13",
  cost: 3e12,
  description: () => `Multiply Matter gain based on Kohler Points`,
  effect: () => Math.max(Currency.kohlerPoints.value.clampMin(1).log10(),1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 14,
  name: "Matter Upgrade 14",
  cost: 2e13,
  description: () => `Matter gain is boosted based on Antimatter in IC9`,
  effect: () => Math.max(Currency.antimatter.value.clampMin(1).log10() / 500, 1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 15,
  name: "Matter Upgrade 15",
  cost: 1e14,
  description: () => `Unlock Matter Dimensions`,
  effect: () => 1,
 },
 {
  id: 16,
  name: "Matter Upgrade 16",
  cost: 5e17,
  description: () => `Weak Matter boosts Matter gain`,
  effect: () => new Decimal((Currency.weakMatter.value).clampMin(1).log10()).clampMin(1),
  effectType: "×",
  formatEffect: value => formatX(value, 2, 2) 
 },
 {
  id: 17,
  name: "Matter Upgrade 17",
  cost: 5e18,
  description: () => `Energy effect boosts Infinity Point gain`,
  effect: () => {
    let x = energyEffect();
    if (x.gt(1.4)){
      x = x.div(1.4);
      x = x.pow(0.33);
      x = x.times(1.4)
    }
    return x;
  },
  effectType: "^",
  formatEffect: value => formatPow(value, 2, 2) 
 },
 {
  id: 18,
  name: "Matter Upgrade 18",
  cost: 1.5e19,
  description: () => `Energy effect boosts Gamespeed in Infinity Challenge 9`,
  effect: () => energyEffect(),
  effectType: "^",
  formatEffect: value => formatPow(value, 2, 2) 
 },
 {
  id: 19,
  name: "Matter Upgrade 19",
  cost: 5e19,
  description: () => `Improve the Weak Matter to Energy conversion`,
  effect: () => 5
 },
 {
  id: 20,
  name: "Matter Upgrade 20",
  cost: 1e20,
  description: () => `Energy effect affects Matter Gain`,
  effect: () =>{
    let x = energyEffect();
    if (x.gt(1.3)){
      x = x.div(1.3);
      x = x.pow(0.25);
      x = x.times(1.3)
    }
    return x;
  },
  effectType: "^",
  formatEffect: value => formatPow(value, 2, 2) 
 }
];
