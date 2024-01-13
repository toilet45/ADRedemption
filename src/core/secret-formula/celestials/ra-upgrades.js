import { DC } from "../../constants";
import { Currency } from "../../currency";
import { DEV } from "@/env";

const formatCost = c => format(c, 2);

const rebuyable = config => {
  return {
    id: config.id,
    celestial: config.celestial,
    description: config.description,
    cost: () => getHybridCostScaling(
      player.celestials.ra.rebuyables[config.id],
      0,
      config.baseCost,
      10,
      (90 * 10 ** player.celestials.ra.rebuyables[config.id]), // This is dumb. Very dumb. I know. Its also very easy, and does what i want. Shut up.
      DC.E333,
      10,
      10 //Yes the exponential and linear here are the same. Thats on purpose, this code is easier to use for just exponential (weirdly) so thats what im doing.
    ),
    formatCost,
    effect: config.effect,
    formatEffect: x => formatX(x, 2, 2),
    currency: Currency.mendingPoints,
    currencyLabel: config.currencyLabel,
    rebuyable: true,
    implemented: DEV
  }
}

const weakenScalingRebuyable = config => {
  return rebuyable({
      id: config.id,
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
    celestial: "teresa",
    description: () => `Weaken Teresa's level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,//temporary, have to decide what we're gonna use (Fn its MvR for all, defined above and in ra-upgrades.js (the other one))
    currencyLabel: "NYI",
  }),
  weakenEffarigScaling: weakenScalingRebuyable({
    id: "weakenEffarigScaling",
    celestial: "effarig",
    description: () => `Weaken Effarig's level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenEnslavedScaling: weakenScalingRebuyable({
    id: "weakenEnslavedScaling",
    celestial: "enslaved",
    description: () => `Weaken Nameless' level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenVScaling: weakenScalingRebuyable({
    id: "weakenVScaling",
    celestial: "v",
    description: () => `Weaken V's level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenRaScaling: weakenScalingRebuyable({
    id: "weakenRaScaling",
    celestial: "ra",
    description: () => `Weaken Ra's level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenLaitelaScaling: weakenScalingRebuyable({
    id: "weakenLaitelaScaling",
    celestial: "laitela",
    description: () => `Weaken Lai'tela's level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenPelleScaling: weakenScalingRebuyable({
    id: "weakenPelleScaling",
    celestial: "pelle",
    description: () => `Weaken Pelle's level cost by ${formatX(10)}`/* (before exponents)*/,
    baseCost: 1e7,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incTeresaXPGain: incXpGainRebuyable({
    id: "incTeresaXPGain",
    celestial: "teresa",
    description: () => `Increase Teresa's XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incEffarigXPGain: incXpGainRebuyable({
    id: "incEffarigXPGain",
    celestial: "effarig",
    description: () => `Increase Effarig's XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incEnslavedXPGain: incXpGainRebuyable({
    id: "incEnslavedXPGain",
    celestial: "enslaved",
    description: () => `Increase Nameless' XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incVXPGain: incXpGainRebuyable({
    id: "incVXPGain",
    celestial: "v",
    description: () => `Increase V's XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incRaXPGain: incXpGainRebuyable({
    id: "incRaXPGain",
    celestial: "ra",
    description: () => `Increase Ra's XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incLaitelaXPGain: incXpGainRebuyable({
    id: "incLaitelaXPGain",
    celestial: "laitela",
    description: () => `Increase Lai'tela's XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  incPelleXPGain: incXpGainRebuyable({
    id: "incPelleXPGain",
    celestial: "pelle",
    description: () => `Increase Pelle's XP gain by ${formatX(10)} (before exponents)`,
    baseCost: 1e11,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  temp1: {
    id: "temp1",
    celestial: "teresa",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
  temp2: {
    id: "temp2",
    celestial: "effarig",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
  temp3: {
    id: "temp3",
    celestial: "enslaved",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
  temp4: {
    id: "temp4",
    celestial: "v",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
  temp5: {
    id: "temp5",
    celestial: "ra",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
  temp6: {
    id: "temp6",
    celestial: "laitela",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
  temp7: {
    id: "temp7",
    celestial: "pelle",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
    implemented: false,
  },
}