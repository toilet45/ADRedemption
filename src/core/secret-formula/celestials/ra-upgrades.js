import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.celestials.ra.rebuyables[props.id],
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
      return effect * player.celestials.ra.rebuyables[props.id];
    }
    return Math.pow(effect, player.celestials.ra.rebuyables[props.id]);
  }
  props.description = () => props.textTemplate.replace("{value}",formatInt(effect));
  props.formatEffect = value => {
    if (props.id === 6 || props.id === 16) return effectType + `${formatInt(value)}`
    if (props.id === 11) return effectType + `${formatFloat(value, 3)}`
    return effectType + `${format(value, 2, 0)}`
  };
  props.formatCost = value => format(value, 2, 0);
  return props;
};


export const raUpgrades = [
  rebuyable({
    name: "Ra Upgrade 1",
    id: 1,
    initialCost: 1e300,
    costMult: 1,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "+"
  }),
  rebuyable({
    name: "Ra Upgrade 2",
    id: 2,
    initialCost: 1e300,
    costMult: 30,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "+"
  }),
  rebuyable({
    name: "Ra Upgrade 3",
    id: 3,
    initialCost: 1e300,
    costMult: 30,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "+"
  }),
  rebuyable({
    name: "Ra Upgrade 4",
    id: 4,
    initialCost: 1e300,
    costMult: 30,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "+"
  }),
  rebuyable({
    name: "Ra Upgrade 5",
    id: 5,
    initialCost: 1e300,
    costMult: 30,
    textTemplate: "[TBD]",
    effect: 1,
    effectType: "+"
  }),
  {
    name: "Ra Upgrade 6",
    id: 6,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 7",
    id: 7,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 8",
    id: 8,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 9",
    id: 9,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 10",
    id: 10,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 11",
    id: 11,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 12",
    id: 12,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 13",
    id: 13,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 14",
    id: 14,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 15",
    id: 15,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 16",
    id: 16,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 17",
    id: 17,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 18",
    id: 18,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 19",
    id: 19,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 20",
    id: 20,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 21",
    id: 21,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 22",
    id: 22,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 23",
    id: 23,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 24",
    id: 24,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Ra Upgrade 25",
    id: 25,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    description: "[NYI]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
];
