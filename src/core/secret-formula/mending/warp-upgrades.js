import { DC } from "../../constants";
import { Currency } from "../../currency";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.mending.warpRebuyables[props.id],
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
    if (props.effectType === "+" || props.effectType === "-" || props.effectType === "×1e" ){
      return effect * player.mending.warpRebuyables[props.id];
    }
    return Math.pow(effect, player.mending.warpRebuyables[props.id]);
  };
  props.description = () => props.textTemplate.replace("{value}",formatInt(effect));
  if (!props.noEffect) {
    props.formatEffect = value => effectType + format(value, 2, 0);
    if(props.id==3) props.formatEffect = value => effectType + format(value, 3, 3);
    props.formatCost = value => format(value, 2, 0);
  }
  return props;
};


export const warpUpgrades = [
  rebuyable({
    name: "More Infinite Power",
    id: 1,
    initialCost: 1e30,
    costMult: 1e5,
    textTemplate: "Increase Infinite Power softcap's Thereshold by ×1e2.5e14",
    effect: 2.5e14,
    effectType: "×1e"
  }),
  rebuyable({
    name: "Memory Gain",
    id: 2,
    initialCost: 1e20,
    costMult: 100,
    textTemplate: "Improve Ra's memory gain by ×3",
    effect: 3,
    effectType: "×"
  }),
  rebuyable({
    name: "Game speed softcap",
    id: 3,
    initialCost: 1e20,
    costMult: 100,
    textTemplate: "Increase Game speed's softcap by 0.002",
    effect: 0.002,
    effectType: "+"
  }),
  {
    name: "Visible Galaxies",
    id: 4,
    cost: 1e55,
    requirement: () => Ra.unlocks.unlockSHardV.isUnlocked ? `Reach ${formatInt(913579)} total Galaxies in V's Superhard Reality.` : "Reach V Level 40 to see unlock condition",
    hasFailed: () => !V.isSuperRunning,
    checkRequirement: () => V.isSuperRunning && Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies>=913579,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Decrease Obscure Galaxy scaling polynomial level by ${formatInt(1)}`,
  },
  {
    name: "The Dedicated Way",
    id: 5,
    cost: 1e24,
    requirement: () => `Reach ${format(new Decimal("1e2450000000000000000"))} Antimatter in Ra's Reality`,
    hasFailed: () => !Ra.isRunning,
    checkRequirement: () => Ra.isRunning && Currency.antimatter.exponent>=2.45e18,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Ra's basic Memory chunk gain multiplier based on current Antimatter`,
    effect: () => Math.max(Math.log10(Currency.antimatter.exponent),1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Hostility+",
    id: 6,
    cost: 1e60,
    requirement: () => Ra.unlocks.Hostility.isUnlocked ? "Mend with a total hostility level of at least 60" : "Reach Pelle Level 75 to see unlock condition",
    hasFailed: () => !player.mending.corruptionChallenge.corruptedMend || !player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 60,
    checkRequirement: () => player.mending.corruptionChallenge.corruptedMend && player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 60,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () =>  Ra.unlocks.Hostility.isUnlocked ? `Hostility caps +${formatInt(1)}` : "Reach Pelle Level 75 to see effect",
  },
  {
    name: "Automatic of Speed",
    id: 7,
    cost: 1e75,
    requirement: () => `Reach ${format(new Decimal("1e2300"))} Game Speed`,
    hasFailed: () => false,
    checkRequirement: () => {
      return getGameSpeedupFactor().gte('1e2300');
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "Unlock Black Hole 3 autobuyer",
    effect: () => 1,
  },
  {
    name: "Valuable Cost",
    id: 8,
    cost: 1e70,
    requirement: () => Ra.unlocks.Hostility.isUnlocked ? `Reach ${format(3e15)} Time Theorems in Teresa's Reality of Level 9+ Study of Forever Hostile Mend` : "Reach Pelle Level 75 to see unlock condition",
    hasFailed: () => !player.mending.corruptionChallenge.corruptedMend || player.mending.corruption[9]<9,
    checkRequirement: () => player.mending.corruptionChallenge.corruptedMend && player.mending.corruption[9] && Teresa.isRunning && Currency.timeTheorems.value.gte(3e15),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "Reduce Myriad Study cost by 50 Space Theorems",
    effect: () => 1
  },
  {
    name: "Living Multiverse",
    id: 9,
    cost: 1e75,
    requirement: () => `Reach ${format(1.845e9, 3, 3)} total Galaxies in a Doomed reality without Galaxy Generator`,
    hasFailed: () => !Pelle.isDoomed || Pelle.hasGalaxyGenerator,
    checkRequirement: () => (Pelle.isDoomed&&!Pelle.hasGalaxyGenerator)&&(Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies >= 1.845e9),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "Galactic Shards improve Galaxy better",
    effect: () => 1,
  },
  {
    name: "Boost Readjustment",
    id: 10,
    cost: 1e60,
    requirement: () => `Reach ${format(2e37)} Memory Crystals.`,
    hasFailed: () => false,
    checkRequirement: () => Currency.raPoints.value.gte(2e37),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Dimension boost scaling occurs ${formatX(20)} later`,
  },
  {
    name: "Noticeable Galaxies",
    id: 11,
    cost: 1e65,
    requirement: () => Ra.unlocks.kohlersRealmUnlock.isUnlocked ? "Reach Kohler unlock progress milestone 3" : "Reach Pelle Level 100 to see unlock condition",
    hasFailed: () => !Ra.unlocks.kohlersRealmUnlock.isUnlocked,
    checkRequirement: () => Kohler.unlockProgress>=35,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Decrease Obscure Galaxy scaling polynomial level by ${formatInt(1)}`,
  },
  {
    name: "Hostility++",
    id: 12,
    cost: 1e300,
    requirement: () => Ra.unlocks.Hostility.isUnlocked ? "Mend with a total hostility level of at least 80" : "Reach Pelle Level 75 to see unlock condition",
    hasFailed: () => !player.mending.corruptionChallenge.corruptedMend || !player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 80,
    checkRequirement: () => player.mending.corruptionChallenge.corruptedMend && player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 80,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => Ra.unlocks.Hostility.isUnlocked ? `Hostility caps +${formatInt(1)}` : "Reach Pelle Level 75 to see effect",
  },
  /*
  {
    name: "Warp Upgrade 13",
    id: 13,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 14",
    id: 14,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Hostility+",
    id: 15,
    cost: 1e300,
    requirement: "Mend with an average corruption level of 6 or higher",
    hasFailed: () => !player.mending.corruptionChallenge.corruptedMend || !player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 6,
    checkRequirement: () => player.mending.corruptionChallenge.corruptedMend && player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 6,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Hostility caps +${formatInt(1)}`,
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 16",
    id: 16,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 17",
    id: 17,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 18",
    id: 18,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 19",
    id: 19,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 20",
    id: 20,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 21",
    id: 21,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 22",
    id: 22,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Warp Upgrade 23",
    id: 23,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: "[TBD]",
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Noticeable Galaxies",
    id: 24,
    cost: 1e300,
    requirement: "Wait 5 Hours [NYI]",
    hasFailed: () => false,
    checkRequirement: () => false,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Obscure galaxy polynomial level -${formatInt(1)}`,
  },
  {
    name: "Hostility++",
    id: 25,
    cost: 1e300,
    requirement: "Mend with an average corruption level of 8 or higher",
    hasFailed: () => !player.mending.corruptionChallenge.corruptedMend || !player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 8,
    checkRequirement: () => player.mending.corruptionChallenge.corruptedMend && player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) >= 8,
    checkEvent: GAME_EVENT.MENDING_RESET_BEFORE,
    canLock: false,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => `Hostility caps +${formatInt(1)}`,
    effect: () => 1,
    formatEffect: value => formatX(value, 2, 2)
  }, */
];
