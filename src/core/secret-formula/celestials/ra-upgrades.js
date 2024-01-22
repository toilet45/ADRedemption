import { DC } from "../../constants";
import { Currency } from "../../currency";
import { DEV } from "@/env";
//import { Ra } from "../../globals";

const formatCost = c => format(c, 2);

const rebuyable = config => {
  return {
    id: config.id,
    num: config.num,
    celestial: config.celestial,
    description: config.description,
    cost: () => /*getHybridCostScaling(
      player.celestials.ra.rebuyables[config.id],
      0,
      config.baseCost,
      10,
      (90 * 10 ** player.celestials.ra.rebuyables[config.id]), // This is dumb. Very dumb. I know. Its also very easy, and does what i want. Shut up.
      DC.E333,
      10,
      10 //Yes the exponential and linear here are the same. Thats on purpose, this code is easier to use for just exponential (weirdly) so thats what im doing.
    )*/config.num<=7 ? config.baseCost*(2.5**player.celestials.ra.rebuyables[config.id]) : config.baseCost*(10**(player.celestials.ra.rebuyables[config.id]*player.celestials.ra.rebuyables[config.id]*0.1+player.celestials.ra.rebuyables[config.id])),//Idk how you make cost decrease --sxy
    formatCost,
    effect: config.effect,
    formatEffect: x => formatX(x, 2, 2),
    currency: Currency.raPoints,
    currencyLabel: config.currencyLabel,
    rebuyable: true,
    implemented: DEV
  }
}

const weakenScalingRebuyable = config => {
  return rebuyable({
      id: config.id,
      num: config.num,
      celestial: config.celestial,
      description: config.description,
      baseCost: config.baseCost,
      currency: config.currency,
      currencyLabel: config.currencyLabel,
      effect: () => Math.pow(10, player.celestials.ra.rebuyables[config.id])
    }
  )
}

const incXpGainRebuyable = config => {
  return rebuyable({
      id: config.id,
      num: config.num,
      celestial: config.celestial,
      description: config.description,
      baseCost: config.baseCost,
      currency: config.currency,
      currencyLabel: config.currencyLabel,
      effect: () => Math.pow(10, player.celestials.ra.rebuyables[config.id])
    }
  )
}

export const raUpgrades = {
  weakenTeresaScaling: weakenScalingRebuyable({
    id: "weakenTeresaScaling",
    num: 1,
    celestial: "teresa",
    description: () => `Weaken Teresa's level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,//temporary, have to decide what we're gonna use (Fn its MvR for all, defined above and in ra-upgrades.js (the other one))
    currencyLabel: "Memory Crystal",
  }),
  weakenEffarigScaling: weakenScalingRebuyable({
    id: "weakenEffarigScaling",
    num: 2,
    celestial: "effarig",
    description: () => `Weaken Effarig's level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  weakenEnslavedScaling: weakenScalingRebuyable({
    id: "weakenEnslavedScaling",
    num: 3,
    celestial: "enslaved",
    description: () => `Weaken Nameless' level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  weakenVScaling: weakenScalingRebuyable({
    id: "weakenVScaling",
    num: 4,
    celestial: "v",
    description: () => `Weaken V's level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  weakenRaScaling: weakenScalingRebuyable({
    id: "weakenRaScaling",
    num: 5,
    celestial: "ra",
    description: () => `Weaken Ra's level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  weakenLaitelaScaling: weakenScalingRebuyable({
    id: "weakenLaitelaScaling",
    num: 6,
    celestial: "laitela",
    description: () => `Weaken Lai'tela's level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  weakenPelleScaling: weakenScalingRebuyable({
    id: "weakenPelleScaling",
    num: 7,
    celestial: "pelle",
    description: () => `Weaken Pelle's level cost by ${formatX(10)} (before exponents)`,
    baseCost: 1e7,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incTeresaXPGain: incXpGainRebuyable({
    id: "incTeresaXPGain",
    num: 8,
    celestial: "teresa",
    description: () => `Increase Teresa's Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incEffarigXPGain: incXpGainRebuyable({
    id: "incEffarigXPGain",
    num: 9,
    celestial: "effarig",
    description: () => `Increase Effarig's Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incEnslavedXPGain: incXpGainRebuyable({
    id: "incEnslavedXPGain",
    num: 10,
    celestial: "enslaved",
    description: () => `Increase Nameless' Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incVXPGain: incXpGainRebuyable({
    id: "incVXPGain",
    num: 11,
    celestial: "v",
    description: () => `Increase V's Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incRaXPGain: incXpGainRebuyable({
    id: "incRaXPGain",
    num: 12,
    celestial: "ra",
    description: () => `Increase Ra's Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incLaitelaXPGain: incXpGainRebuyable({
    id: "incLaitelaXPGain",
    num: 13,
    celestial: "laitela",
    description: () => `Increase Lai'tela's Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  incPelleXPGain: incXpGainRebuyable({
    id: "incPelleXPGain",
    num: 14,
    celestial: "pelle",
    description: () => `Increase Pelle's Memory gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e8,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
  }),
  teresaUpgrade: {
    id: "teresaUpgrade",
    celestial: "teresa",
    description: "Cost of Elliptic Materiality ^0.85, and add extra Reality Machine cap based on Teresa's Reality Antimatter Record.",
    cost: 1e18,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: true//Ra.unlocks.improvedPetUpgrades.isUnlocked,
  },
  effarigUpgrade: {
    id: "effarigUpgrade",
    celestial: "effarig",
    description: "Triple Reality Glyph level.",
    cost: 1e19,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: true,
  },
  enslavedUpgrade: {
    id: "enslavedUpgrade",
    celestial: "enslaved",
    description: "Stored Real Time is always at its cap, and Stored Real Time affects Game Speed.",
    cost: 1e19,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: true,
  },
  vUpgrade: {
    id: "vUpgrade",
    celestial: "v",
    description: "The memory rebuyable Warp Upgrade now also affect achievement multiplier.",
    cost: 1e19,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: true,
  },
  raUpgrade: {
    id: "raUpgrade",
    celestial: "ra",
    description: "Improve Memory Crystal gaining formula.",
    cost: 1e16,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: false,
  },
  laitelaUpgrade: {
    id: "laitelaUpgrade",
    celestial: "laitela",
    description: "Singularities increases Dark Matter cap.",
    cost: 1e24,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: true,
  },
  pelleUpgrade: {
    id: "pelleUpgrade",
    celestial: "pelle",
    description: "Doomed Reality won't END if Galaxy Generator is not unlocked.",
    cost: 1e24,
    currency: () => Currency.raPoints,
    currencyLabel: "Memory Crystal",
    implemented: true,
  },
}