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
    name: "Kohler Upgrade 1",
    initialCost: 10,
    costMult: 50,
    textTemplate: `Multiply Kohler Point gain by {value}.`,
    effect: 2,
    effectType: "×"
  }),
  rebuyable({
    id: 2,
    name: "Kohler Upgrade 2",
    initialCost: 10,
    costMult: 25,
    textTemplate: "Multiply Gamespeed by 4",
    effect: 4,
    effectType: "×"
  }),
  rebuyable({
    id: 3,
    name: "Kohler Upgrade 3",
    initialCost: 1e300,
    costMult: 9,
    textTemplate: "[TBD]",
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    id: 4,
    name: "Kohler Upgrade 4",
    initialCost: 1e300,
    costMult: 9,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "×"
  }),
  rebuyable({
    id: 5,
    name: "Kohler Upgrade 5",
    initialCost: 1e300,
    costMult: 9,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "×"
  }),
  {
    id: 6,
    name: "Kohler Upgrade 6",
    cost: 2,
    description: () => `Multiply 1st Antimatter Dimension based on unspent Kohler Points, after nerfs.`,
    effect: () => {
      let x = KohlerUpgrade(10).isBought ? Decimal.pow(player.bestKohlerPoints.add(1).clampMin(1), 5) : Currency.kohlerPoints.value.add(1).clampMin(1);
      if (x.gte(1e13)){
        x = x.div(1e13);
        x = x.pow(0.1);
        x = x.times(1e13);
      }
      return x;
    },
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 7,
    name: "Kohler Upgrade 7",
    cost: 5,
    description: () => `Start with 5 Dimension Boosts and a Galaxy in Kohler's Realm runs`,
    effect: () => 1,
  },
  {
    id: 8,
    name: "Kohler Upgrade 8",
    cost: 10,
    description: () => `Start with 1 8th Antimatter Dimension in Kohler's Realm runs and it's also affected by Kohler Upgrade 6`,
    effect: () => 1,
  },
  {
    id: 9,
    name: "Kohler Upgrade 9",
    cost: 20,
    description: () => `Kohler Upgrade 6 also affects Gamespeed`,
    effect: () => KohlerUpgrade(6).effectValue,
  },
  {
    id: 10,
    name: "Kohler Upgrade 10",
    cost: 30,
    description: () => `Kohler Upgrade 6 effect ^5, and upgrades based on Kohler Points are based on best`,
    effect: () => 1,
  },
];
