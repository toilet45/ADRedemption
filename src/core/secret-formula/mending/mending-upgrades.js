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
  /*{
    id: 4,
    cost: 10,
    description: "[NYI] Have 5 Glyph slots in Doomed Reality (but you can only equip 1 of each Glyph type)",
  }*/
];