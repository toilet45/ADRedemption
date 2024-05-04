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
  props.description = () => props.textTemplate.replace("{value}", format(effect, 2, 2));
  props.formatEffect = value => {
    /*if (props.id === 6 || props.id === 16) return effectType + `${formatInt(value)}`
    if (props.id === 11) return effectType + `${formatFloat(value, 3)}`*/
    return effectType + `${format(value, 2, 2)}`
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
    initialCost: 1e9,
    costMult: 1e3,
    textTemplate: "Multiply Infinity Point gain by {value}",
    effect: 10,
    effectType: "×"
  }),
  rebuyable({
    id: 5,
    name: "Kohler Upgrade 5",
    initialCost: 1e300,
    costMult: 9,
    textTemplate: `Raise all Dimensions by ^{value} [NYI]`,
    effect: 1.1,
    effectType: "^"
  }),
  {
    id: 6,
    name: "Kohler Upgrade 6",
    cost: 2,
    description: () => `Multiply 1st Antimatter Dimension based on unspent Fragmented Remains, after nerfs.`,
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
    description: () => `Kohler Upgrade 6 effect ^5, and is based on best Fragmented Remains`,
    effect: () => 1,
  },
  {
    id: 11,
    name: "Kohler Upgrade 11",
    cost: 4000,
    description: () => `Gain more Fragmented Remains based on Antimatter`,
    effect: () => Math.max(1, Currency.antimatter.value.log10() / 10),
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
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
    description: () => `In Kohler's Realm: Divide Galaxy Requirements by 10 and Galaxies are ${formatX(1e8)} as powerful`,
    effect: 1
  },
  {
    id: 14,
    name: "Kohler Upgrade 14",
    cost: 30000,
    description: () => `In Kohler's Realm: gain an exponentally increasing multiplier to all Antimatter Dimensions similar to C3`,
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
    cost: 50000,
    description: () => `Multiply Kohler Point Gain based on real time spent in Kohler's Realm`,
    effect: () => Math.max(1, Math.log(player.records.thisMend.realTime / 1000) + 1),
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 16,
    name: "Kohler Upgrade 16",
    cost: 200000,
    description: () => `Square Gamespeed in Kohler's Realm (applies after other Kohler Upgrades, does not work in places with fixed Gamespeed)`,
    effect: 2
  },
  {
    id: 17,
    name: "Kohler Upgrade 17",
    cost: 350000,
    description: () => ` In Kohler's Realm: Gain an Additional Antimatter Dimension Multiplier based on Galaxies`,
    effect: () => Decimal.pow(2, player.galaxies),
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 18,
    name: "Kohler Upgrade 18",
    cost: 500000,
    description: () => `1st Antimatter Dimension multiplier affects Gamespeed in Kohler's Realm at a reduced rate`,
    effect: () => {
      let x = Decimal.pow(AntimatterDimension(1).multiplier, 0.5);
      if (x.gte(1e50)){
        x = x.div(1e50);
        x = x.pow(0.1);
        x = x.times(1e50);
      }
      return x;
    },
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 19,
    name: "Kohler Upgrade 19",
    cost: 1e6,
    description: () => `In Kohler's Realm: Galaxies are more effective based on Dimension Boosts`,
    effect: () => 1 + (0.1 * player.dimensionBoosts),
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 20,
    name: "Kohler Upgrade 20",
    cost: 1e7,
    description: () => `Unlock additional Kohler exclusive Infinity Upgrades`
  },
  {
    id: 21,
    name: "Kohler Upgrade 21",
    cost: 1e14,
    description: () => 'Fragmented Remains boost Energy gain',
    effect: () => Math.max(1, (Currency.kohlerPoints.value.add(1)).log10()) / 3,
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 22,
    name: "Kohler Upgrade 22",
    cost: 1e15,
    description: () => '1st Matter Dimension Multiplier affects Matter gain',
    effect: () => MatterDimension(1).multiplier,
    effectType: "×",
    formatEffect: value => formatX(value, 2, 2) 
  },
  {
    id: 23,
    name: "Kohler Upgrade 23",
    cost: 1e300,
    description: () => '[TBD]',
    effect: () => 1
  },
  {
    id: 24,
    name: "Kohler Upgrade 24",
    cost: 1e300,
    description: () => '[TBD]',
    effect: () => 1
  },
  {
    id: 25,
    name: "Kohler Upgrade 25",
    cost: 1e300,
    description: () => '[TBD]',
    effect: () => 1
  }
];
