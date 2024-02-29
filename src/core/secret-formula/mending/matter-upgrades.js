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
  props.description = () => props.textTemplate.replace("{value}", formatInt(effect));
  props.formatEffect = value => {
    /*if (props.id === 6 || props.id === 16) return effectType + `${formatInt(value)}`
    if (props.id === 11) return effectType + `${formatFloat(value, 3)}`*/
    return effectType + `${format(value, 2, 0)}`
  };
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const matterUpgrades = [
  rebuyable({
    id: 1,
    name: "Matter Upgrade 1",
    initialCost: 1e300,
    costMult: 1e300,
    textTemplate: `[TBD]`,
    effect: 1,
    effectType: "×"
  }),
  rebuyable({
    id: 2,
    name: "Matter Upgrade 2",
    initialCost: 1e300,
    costMult: 1e300,
    textTemplate: `[TBD]`,
    effect: 1,
    effectType: "×"
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
  cost: 1e300,
  description: () => `???`,
 }, 
 {
  id: 7,
  name: "Matter Upgrade 7",
  cost: 1e300,
  description: () => `???`,
 }, 
 {
  id: 8,
  name: "Matter Upgrade 8",
  cost: 1e300,
  description: () => `???`,
 }, 
 {
  id: 9,
  name: "Matter Upgrade 9",
  cost: 1e300,
  description: () => `???`,
 },  {
  id: 10,
  name: "Matter Upgrade 10",
  cost: 1e300,
  description: () => `???`,
 }, 
];
