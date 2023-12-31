import { DC } from "../constants";

import { DimensionState } from "./dimension";

export function buySingleMultiversalDimension(tier, auto = false) {
  const dim = MultiversalDimension(tier);
  if (Currency.mendingPoints.lt(dim.cost)) return false;

  Currency.mendingPoints.subtract(dim.cost);
  dim.amount = dim.amount.plus(1);
  dim.bought += 1;
  dim.cost = dim.nextCost(dim.bought);
  return true;
}

export function resetMultiversalDimensions() {
  for (const dim of MultiversalDimensions.all) dim.amount = new Decimal(dim.bought);
  updateMultiversalDimensionCosts();
}

export function fullResetMultiversalDimensions() {
  for (const dim of MultiversalDimensions.all) {
    dim.cost = new Decimal(dim.baseCost);
    dim.amount = DC.D0;
    dim.bought = 0;
  }
}

export function buyMaxMultiversalDimension(tier, portionToSpend = 1, isMaxAll = false) {
  const canSpend = Currency.mendingPoints.value.times(portionToSpend);
  const dim = MultiversalDimension(tier);
  if (canSpend.lt(dim.cost)) return false;
  let bulk = null;
  try{
    bulk = bulkBuyBinarySearch(canSpend, {
      costFunction: bought => dim.nextCost(bought),
      cumulative: true,
      firstCost: dim.cost,
    }, dim.bought);
  }
  catch {
    dim.bought = 1e15;
    return true;
  }
  if (!bulk) return false;
  Currency.mendingPoints.subtract(bulk.purchasePrice);
  dim.amount = dim.amount.plus(bulk.quantity);
  dim.bought += bulk.quantity;
  dim.cost = dim.nextCost(dim.bought);
  return true;
}

export function maxAllMultiversalDimensions() {
  // Try to buy single from the highest affordable new dimensions
  for (let i = 8; i > 0 && MultiversalDimension(i).bought === 0; i--) {
    buySingleMultiversalDimension(i, true);
  }

  // Buy everything costing less than 1% of initial MvR
  for (let i = 8; i > 0; i--) {
    buyMaxMultiversalDimension(i, 0.01, true);
  }

  // Loop buying the cheapest dimension possible; explicit infinite loops make me nervous
  const unlockedDimensions = MultiversalDimensions.all;
  for (let stop = 0; stop < 1000; stop++) {
    const cheapestDim = unlockedDimensions.reduce((a, b) => (b.cost.gte(a.cost) ? a : b));
    if (!buySingleMultiversalDimension(cheapestDim.tier, true)) break;
  }
}

export function multiversalDimensionCommonMultiplier() {
  let mult = new Decimal(1)
  return mult;
}

export function updateMultiversalDimensionCosts() {
  for (let i = 1; i <= 8; i++) {
    const dim = MultiversalDimension(i);
    dim.cost = dim.nextCost(dim.bought);
  }
}

class MultiversalDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.multiversal, tier);
    const BASE_COSTS = [null, new Decimal(1e25), new Decimal(1e55), new Decimal(1e105), new Decimal(1e215), new Decimal("1e333"), new Decimal("1e456"), new Decimal("1e678"), new Decimal("9.99e999")];
    this._baseCost = BASE_COSTS[tier];
    const COST_MULTS = [null, 10, 50, 250, 1250, 6250, 3125, 156250, 781250];
    this._costMultiplier = COST_MULTS[tier];
    const E6000_SCALING_AMOUNTS = [null, 5e3, 5e3, 5e3, 5e3, 5e3, 5e3, 5e3, 5e3];
    this._e6000ScalingAmount = E6000_SCALING_AMOUNTS[tier];
    const COST_THRESHOLDS = [new Decimal("1e2000"), new Decimal("1e8000"), new Decimal("1e22000")];
    this._costIncreaseThresholds = COST_THRESHOLDS;
  }

  /** @returns {Decimal} */
  get cost() {
    return this.data.cost;
  }

  /** @param {Decimal} value */
  set cost(value) { this.data.cost = value; }

  nextCost(bought) {
    if (this._tier > 4 && bought < this.e6000ScalingAmount) {
      const cost = Decimal.pow(this.costMultiplier, bought).times(this.baseCost);
      return cost;
    }

    const costMultIncreases = [5, 25, 125];
    for (let i = 0; i < this._costIncreaseThresholds.length; i++) {
      const cost = Decimal.pow(this.costMultiplier * costMultIncreases[i], bought).times(this.baseCost);
      if (cost.lt(this._costIncreaseThresholds[i])) return cost;
    }

    let base = this.costMultiplier;
    if (this._tier <= 4) base *= 125;
    const exponent = this.e6000ScalingAmount + (bought - this.e6000ScalingAmount) * MultiversalDimensions.scalingPast1e6000;
    const cost = Decimal.pow(base, exponent).times(this.baseCost);

    return cost;
  }

  get isAvailableForPurchase() {
    return this.isAffordable;
  }

  get isAffordable() {
    return Currency.mendingPoints.gte(this.cost);
  }

  get multiplier() {
    const tier = this._tier;
    let mult = GameCache.multiversalDimensionCommonMultiplier.value

    const dim = MultiversalDimension(tier);
    const bought =  dim.bought;
    mult = mult.times(Decimal.pow(dim.powerMultiplier, bought));

    return mult;
  }

  get productionPerSecond() {
    let production = this.totalAmount.times(this.multiplier);
    return production;
  }

  get rateOfChange() {
    const tier = this._tier;
    if (tier === 8) {
      return DC.D0;
    }
    const toGain = MultiversalDimension(tier + 1).productionPerSecond;
    const current = Decimal.max(this.totalAmount, 1);
    return toGain.times(10).dividedBy(current); // .times(getGameSpeedupForDisplay());
  }

  get isProducing() {
    const tier = this.tier;
    return this.totalAmount.gt(0);
  }

  get baseCost() {
    return this._baseCost;
  }

  get costMultiplier() {
    return this._costMultiplier;
  }

  get powerMultiplier() {
    return DC.D4;
  }

  get e6000ScalingAmount() {
    return this._e6000ScalingAmount;
  }

  get costIncreaseThresholds() {
    return this._costIncreaseThresholds;
  }

  get isCapped() {
    return this.bought >= this.purchaseCap;
  }

  get totalAmount(){
    return this.amount;
  }

}

/**
 * @function
 * @param {number} tier
 * @return {MultiversalDimensionState}
 */
export const MultiversalDimension = MultiversalDimensionState.createAccessor();

export const MultiversalDimensions = {
  /**
   * @type {MultiversalDimensionState[]}
   */
  all: MultiversalDimension.index.compact(),

  get scalingPast1e6000() {
    return 5;
  },

  tick(diff) {
    for (let tier = 8; tier > 1; tier--) {
      MultiversalDimension(tier).produceDimensions(MultiversalDimension(tier - 1), new Decimal(diff).div(10));
    }
    MultiversalDimension(1).produceCurrency(Currency.galBoostPoints, diff);
  }
};
