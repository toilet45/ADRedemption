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
  const { effect, effectType } = props;
  props.effect = () =>{ 
    if (props.effectType === "+" || props.effectType === "-"){
      return effect * player.mending.rebuyables[props.id];
    }
    return Math.pow(effect, player.mending.rebuyables[props.id]);
  }
  props.description = () => props.id == 11 ? props.textTemplate.replace("{value}", formatFloat(effect, 3)): props.textTemplate.replace("{value}", formatInt(effect));
  props.formatEffect = value => {
    if (props.id === 6 || props.id === 16) return effectType + `${formatInt(value)}`
    if (props.id === 11) return effectType + `${formatFloat(value, 3)}`
    return effectType + `${format(value, 2, 0)}`
  };
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const mendingUpgrades = [
  rebuyable({
    id: 1,
    name: "Mending Upgrade 1",
    initialCost: 10,
    costMult: 9,
    textTemplate: "Multiply Multiversal Remain gain by {value}.",
    effect: 3,
    effectType: "×"
  }),
  {
    id: 2,
    name: "Reckoning of the Evulgate",
    cost: 1,
    description: () => `Start every Mend with ${format(1e4)} Realities, every Mend and Reality with ${format(1e6)} Eternities, and all prestiges with ${format(1e12)} Infinities. This upgrade applies immediately when bought.`,
    effect: () => [1e6, 1e12],
  },
  {
    id: 3,
    name: "Reckoning of the Olympia",
    cost: 1,
    description: () => "Start every Mend and Reality with all Eternity Challenges completed 5 times (applies immedately).",
  },
  {
    id: 4,
    name: "Reckoning of the Sabotage",
    cost: 15,
    description: "Start every Mend with Lai'tela's Reality fully destabilized.",
  },
  {
    id: 5,
    name: "Reckoning of the Exhaurire",
    cost: 5,
    description: () => `Always have passive IP, EP, and RM gain (IP and EP gen do not work in Pelle). Remnants are always equal to your best-ever Remnants this Mend.`,
  },
  rebuyable({
    id: 6,
    name: "Mending Upgrade 6",
    initialCost: 2000,
    costMult: 50,
    textTemplate: "Delay post-Lv. 45,000 Glyph scaling by {value}",
    effect: 500,
    effectType: "+"
  }),
  {
    id: 7,
    name: "Libertas Temporis",
    cost: 4,
    description: () => "Start every Mend with Nameless completed and all their upgrades and unlocks. Real time is stored at 500% efficiency, and unlock an Autobuyer for Tesseracts.",
  },
  {
    id: 8,
    name: "Propius ad Scalas",
    cost: 10,
    description: () => "Reduce post-Infinity Antimatter Dimension cost scaling to x1.5 and post-Infinity Tickspeed cost scaling to x1.2.",
  },
  {
    id: 9,
    name: "Sacrificium Misericordae",
    cost: 3,
    description: () => `Start every Mend with Teresa completed and set best AM in their Reality to ${format(DC.E1E10)}.`,
  },
  {
    id: 10,
    name: "Deus Propitius",
    cost: 5,
    description: () => "Weaken the first 3 Pelle Strike penalties.",
  },
  rebuyable({
    id: 11,
    name: "Mending Upgrade 11",
    initialCost: 1e6,
    costMult: 1e4,
    textTemplate: "Weaken the post 50,000 TG scaling by {value}",
    effect: 0.005,
    effectType: "-"
  }),
  {
    id: 12,
    name: "Prior Lingua Adeptus",
    cost: 6,
    description: () => "Glyphs always have a minimum 100% rarity and 4 effects (7 if Effarig). Start every Mend with Effarig Glyphs unlocked.",
  },
  {
    id: 13,
    name: "Regnum Pro Duobus Regnis",
    cost: 15,
    description: () => "Simulate 2 extra Realities for every Reality.",
  },
  {
    id: 14,
    name: "Satus Superbia",
    cost: 8,
    description: () => "Gain 3x Space Theorems gaining multiplier per V-Achievement and start every Mend with all V-Achievements at tier 3 (includes Hard)",
  },
  {
    id: 15,
    name: "Hyperscientia",
    cost: 5,
    description: () => "Raise Memory Gain by ^1.5.",
  },
  rebuyable({
    id: 16,
    name: "Per Aspera Ad Astra",
    initialCost: 1e9,
    costMult: 1e6,
    textTemplate: `Delay Obscure Galaxy Scaling by {value}.`,
    effect: 5000,
    effectType: "+"
  }),
  {
    id: 17,
    name: "Connexa Cosmicis",
    cost: 65,
    description: () => "Disable Remote Galaxy Scaling. Replicanti Galaxy scaling is moved to 1,500 and 10,000.",
  },
  {
    id: 18,
    name: "Confortatus Tenebris",
    cost: 25,
    description: () => "Continuum gives 50% more purchases.",
  },
  {
    id: 19,
    name: "Deus Memorias",
    cost: 100000,
    description: () => "Unlock Ra, Lai'tela, and Pelle Memories, and increase the level cap to 100.",
  },
  {
    id: 20,
    name: "Mending Upgrade 20",
    cost: 100000,
    description: () => "Unlock autobuyer for Mends",
  }
];
