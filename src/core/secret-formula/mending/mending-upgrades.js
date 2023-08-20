import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.mending.rebuyables[props.id],
    1e30,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect } = props;
  props.effect = () => Math.pow(
    effect,
    player.mending.rebuyables[props.id]);
  props.description = () => props.textTemplate.replace("{value}",formatInt(effect));
  props.formatEffect = value => formatX(value, 2, 0);
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const mendingUpgrades = [
  rebuyable({
    id: 1,
    initialCost: 20,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by 3",
    effect: 3
  }),
  {
    id: 2,
    cost: 2,
    description: () => `Start every Mend with ${format(1e4)} Realities, every Mend and Reality with ${format(1e6)} Eternities, and all prestiges with ${format(1e12)} Infinities. (applies immedately when bought)`,
    effect: () => [1e6, 1e12],
  },
  {
    id: 3,
    cost: 5,
    description: () => "Start Every Mend and Reality with all Eternity Challenges completed 5 times (applies immedately)",
  },
  {
    id: 4,
    cost: 10,
    description: "Have 5 Glyph slots in Doomed Reality (but you can only equip 1 of each Glyph type)",
  },
  {
    id: 5,
    cost: 15,
    description: () => `Always Have TS181 and ${format(1e18)} RM Teresa Milestone (No Effect in Pelle)`,
  },
  rebuyable({
    id: 6,
    initialCost: 1e300,
    costMult: 9,
    textTemplate: "Multiply Infinity Point Gain by [TBD]",
    effect: 2
  }),
  {
    id: 7,
    cost: 5,
    description: () => "Unlock Tesseract Autobuyer and start every Mend with Tesseracts unlocked",
  },
  {
    id: 8,
    cost: 20,
    description: () => "Reduce post-Infinity Antimatter Dimension cost scaling to x1.5 and post-Infinity Tickspeed cost scaling to x1.2",
  },
  {
    id: 9,
    cost: 15,
    description: () => `Start every Mend with Teresa Completed and Best AM in their Reality at ${format(DC.E1E10)}`,
  },
  {
    id: 10,
    cost: 20,
    description: () => "Nullify the first 3 Pelle Strike penalties",
  },
  rebuyable({
    id: 11,
    initialCost: 1e300,
    costMult: 9,
    textTemplate: "Multiply Eternity Point Gain by [TBD]",
    effect: 2
  }),
  {
    id: 12,
    cost: 1e300,
    description: () => "Glyphs Always have 100% Rarity and 4 Effects (7 if Effarig). Start every Mend with Effarig Glyphs unlocked",
  },
  {
    id: 13,
    cost: 1e300,
    description: () => "Glyphs are boosted to a minium level of 10,000 in Nameless' Reality, and real time is stored at 500% efficiency",
  },
  {
    id: 14,
    cost: 1e300,
    description: () => "Gain 3 Space Theorems per V-Achievement",
  },
  {
    id: 15,
    cost: 1e300,
    description: () => "Square Memory Gain",
  },
  rebuyable({
    id: 16,
    initialCost: 1e300,
    costMult: 9,
    textTemplate: "Multiply Reality Machine Gain by [TBD]",
    effect: 2
  }),
  {
    id: 17,
    cost: 1e300,
    description: () => "Disable Distant Antimatter Galaxy Scaling and move Remote Scaling to 500,000 Galaxies. Replcanti Galaxy cost scaling is moved to 1,500 and 10,000",
  },
  {
    id: 18,
    cost: 1e300,
    description: () => "Continuum gives 50% more purchases",
  },
  {
    id: 19,
    cost: 1e300,
    description: () => "Unlock Ra, Lai'tela, and Pelle Memories and increase level caps to 100.",
  },
  {
    id: 20,
    cost: 1e300,
    description: () => "Unlock Amalgam Glyphs.",
  }
];