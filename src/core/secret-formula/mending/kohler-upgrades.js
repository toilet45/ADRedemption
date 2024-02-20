import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.mending.kohlerRebuyables[props.id],
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
      return effect * player.mending.kohlerRebuyables[props.id];
    }
    return Math.pow(effect, player.mending.kohlerRebuyables[props.id]);
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

export const kohlerUpgrades = [
  rebuyable({
    id: 1,
    name: "Mending Upgrade 1",
    initialCost: 10,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by {value}.",
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 2,
    name: "Mending Upgrade 1",
    initialCost: 10,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by {value}.",
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 3,
    name: "Mending Upgrade 1",
    initialCost: 10,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by {value}.",
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 4,
    name: "Mending Upgrade 1",
    initialCost: 10,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by {value}.",
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 5,
    name: "Mending Upgrade 1",
    initialCost: 10,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by {value}.",
    effect: 3,
    effectType: "×"
  }),
  {
    id: 6,
    name: "Kohler Upgrade 6",
    cost: 2,
    description: () => `Multiply 1st Antimatter Dimension based on unspent Kohler Points, after nerfs.`,
    effect: () => Currency.kohlerPoints.value.clampMin(1),
  },
  {
    id: 7,
    name: "Reckoning of the Evulgate",
    cost: 1,
    description: () => `Start every Mend with ${format(1e4)} Realities, every Mend and Reality with ${format(1e6)} Eternities, and all prestiges with ${format(1e12)} Infinities. This upgrade applies immediately when bought.`,
    effect: () => [1e6, 1e12],
  },
  {
    id: 8,
    name: "Reckoning of the Evulgate",
    cost: 1,
    description: () => `Start every Mend with ${format(1e4)} Realities, every Mend and Reality with ${format(1e6)} Eternities, and all prestiges with ${format(1e12)} Infinities. This upgrade applies immediately when bought.`,
    effect: () => [1e6, 1e12],
  },
  {
    id: 9,
    name: "Reckoning of the Evulgate",
    cost: 1,
    description: () => `Start every Mend with ${format(1e4)} Realities, every Mend and Reality with ${format(1e6)} Eternities, and all prestiges with ${format(1e12)} Infinities. This upgrade applies immediately when bought.`,
    effect: () => [1e6, 1e12],
  },
  {
    id: 10,
    name: "Reckoning of the Evulgate",
    cost: 1,
    description: () => `Start every Mend with ${format(1e4)} Realities, every Mend and Reality with ${format(1e6)} Eternities, and all prestiges with ${format(1e12)} Infinities. This upgrade applies immediately when bought.`,
    effect: () => [1e6, 1e12],
  },
];
