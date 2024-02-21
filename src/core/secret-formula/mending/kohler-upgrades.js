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
    initialCost: 1000,
    costMult: 50,
    textTemplate: `Increase Base Antimatter Dimension Multiplier in Kohler's Realm by {value}`,
    effect: 20,
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
  {
    id: 11,
    name: "Kohler Upgrade 11",
    cost: 4000,
    description: () => `Gain more Kohler Points based on Antimatter`,
    effect: () => Math.max(1, Currency.antimatter.value.log10() / 10)
  },
  {
    id: 12,
    name: "Kohler Upgrade 12",
    cost: 10000,
    description: () => `Antimatter Dimension cost multipliers are shifted down 2 Dimensions in Kohler's Realm runs outside of C6 (i.e. AD8 has AD6's cost multiplier, ADs 1 and 2 are x10 and x100 respectively)`,
    effect: 1
  },
  {
    id: 13,
    name: "Kohler Upgrade 13",
    cost: 20000,
    description: () => `Divide Galaxy Requirements by 10, and Galaxies are ${formatX(1e8)} as powerful`,
    effect: 1
  },
  {
    id: 14,
    name: "Kohler Upgrade 14",
    cost: 30000,
    description: () => `Gain an exponentally increasing multiplier to all Antimatter Dimensions similar to C3`,
    effect: () => {
      let x = new Decimal(1.0015).pow(player.records.thisMend.realTime / 1000);
      return x.div(Math.max(x.log10(), 1));
    },
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 15,
    name: "Kohler Upgrade 15",
    cost: 20000,
    description: () => `[TBD]`,
    effect: 1
  },
];
