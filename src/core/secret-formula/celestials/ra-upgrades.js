import { DC } from "../../constants";
import { Currency } from "../../currency";

const formatCost = c => format(c, 2);

const rebuyable = config => {
  const {id, description, cost, effect, formatEffect, cap, currency, currencyLabel, celestial} = config;
  return {
    id,
    celestial,
    description,
    cost: () => cost,
    formatCost,
    cap,
    effect,
    formatEffect,
    currency,
    currencyLabel,
    rebuyable: true,
    implemented: cost > 0
  }
}

export const raUpgrades = {
  weakenTeresaScaling: rebuyable({
    id: "weakenTeresaScaling",
    celestial: "teresa",
    description: "Weaken Teresa's post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,//temporary, have to decide what we're gonna use
    currencyLabel: "NYI",
  }),
  weakenEffarigScaling: rebuyable({
    id: "weakenEffarigScaling",
    celestial: "effarig",
    description: "Weaken Effarig's post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenEnslavedScaling: rebuyable({
    id: "weakenEnslavedScaling",
    celestial: "enslaved",
    description: "Weaken Nameless' post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenVScaling: rebuyable({
    id: "weakenVScaling",
    celestial: "v",
    description: "Weaken V's post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenRaScaling: rebuyable({
    id: "weakenRaScaling",
    celestial: "ra",
    description: "Weaken Ra's post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenLaitelaScaling: rebuyable({
    id: "weakenLaitelaScaling",
    celestial: "laitela",
    description: "Weaken Lai 'tela's post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  weakenPelleScaling: rebuyable({
    id: "weakenPelleScaling",
    celestial: "pelle",
    description: "Weaken Pelle's post level 40 scaling",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  }),
  temp1: {
    id: "temp1",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
  temp2: {
    id: "temp2",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
  temp3: {
    id: "temp3",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
  temp4: {
    id: "temp4",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
  temp5: {
    id: "temp5",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
  temp6: {
    id: "temp6",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
  temp7: {
    id: "temp7",
    description: "Placeholder",
    cost: 0,
    currency: () => Currency.antimatter,
    currencyLabel: "NYI",
  },
}