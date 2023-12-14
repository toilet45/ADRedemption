import { DC } from "../constants";

import { DimensionState } from "./dimension";

// Multiplier applied to all Antimatter Dimensions, regardless of tier. This is cached using a Lazy
// and invalidated every update.
export function multiversalDimensionCommonMultiplier() {
  let multiplier = DC.D1;
  return multiplier;
}

function getDimensionFinalMultiplierUncached(tier) {
  if (tier < 1 || tier > 8) throw new Error(`Invalid Multiversal Dimension tier ${tier}`);

  let multiplier = DC.D1;

  multiplier = applyMDMultipliers(multiplier, tier);
  multiplier = applyMDPowers(multiplier, tier);

  return multiplier;
}

function applyMDMultipliers(mult) {
  let multiplier = mult.toDecimal();
  return multiplier;
}

function applyMDPowers(mult) {
  let multiplier = mult.toDecimal();
  return multiplier;
}

function buyOneDimension(tier) {
  const dimension = MultiversalDimension(tier);
  const cost = dimension.cost;
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);

  if (dimension.boughtBefore10 === 9) {
    dimension.challengeCostBump();
  }

  dimension.amount = dimension.amount.plus(1);
  dimension.bought++;
  return true;
}

function buyManyDimension(tier) {
  const dimension = MultiversalDimension(tier);
  const cost = dimension.costUntil10;
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.challengeCostBump();
  dimension.amount = dimension.amount.plus(dimension.remainingUntil10);
  dimension.bought += dimension.remainingUntil10;
  return true;
}

function buyAsManyAsYouCanBuy(tier) {
  const dimension = MultiversalDimension(tier);
  const howMany = dimension.howManyCanBuy;
  const cost = dimension.cost.times(howMany);
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.challengeCostBump();
  dimension.amount = dimension.amount.plus(howMany);
  dimension.bought += howMany;
  return true;
}

// This function doesn't do cost checking as challenges generally modify costs, it just buys and updates dimensions
function buyUntilTen(tier) {
  const dimension = MultiversalDimension(tier);
  dimension.challengeCostBump();
  dimension.amount = Decimal.round(dimension.amount.plus(dimension.remainingUntil10));
  dimension.bought += dimension.remainingUntil10;
}

function maxAll() {
  for (let tier = 1; tier < 9; tier++) {
    buyMaxDimension(tier);
  }
}

function buyMaxDimension(tier, bulk = Infinity) {
  const dimension = MultiversalDimension(tier);
  if (!dimension.isAvailableForPurchase || !dimension.isAffordableUntil10) return;
  const cost = dimension.costUntil10;
  let bulkLeft = bulk;
  const goal = Player.infinityGoal;

  // Buy any remaining until 10 before attempting to bulk-buy
  if (dimension.currencyAmount.gte(cost)) {
    dimension.currencyAmount = dimension.currencyAmount.minus(cost);
    buyUntilTen(tier);
    bulkLeft--;
  }

  if (bulkLeft <= 0) return;

  // This is the bulk-buy math, explicitly ignored if abnormal cost increases are active
  const maxBought = dimension.costScale.getMaxBought(
    Math.floor(dimension.bought / 10) + dimension.costBumps, dimension.currencyAmount, 10
  );
  if (maxBought === null) {
    return;
  }
  let buying = maxBought.quantity;
  if (buying > bulkLeft) buying = bulkLeft;
  dimension.amount = dimension.amount.plus(10 * buying).round();
  dimension.bought += 10 * buying;
  dimension.currencyAmount = dimension.currencyAmount.minus(Decimal.pow10(maxBought.logPrice));
}

class MultiversalDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.antimatter, tier);
    const BASE_COSTS = [null, 1e6, 1e8, 1e10, 1e12, 1e300, 1e300, 1e300, 1e300];
    this._baseCost = BASE_COSTS[tier];
    const BASE_COST_MULTIPLIERS = [null, 1e4, 1e6, 1e8, 1e10, 1e300, 1e300, 1e300, 1e300];
    this._baseCostMultiplier = BASE_COST_MULTIPLIERS[tier];
  }

  /**
   * @returns {ExponentialCostScaling}
   */
  get costScale() {
    return new ExponentialCostScaling({
      baseCost: this._baseCost,
      baseIncrease: this._baseCostMultiplier,
      costScale: Player.dimensionMultDecrease,
      scalingCostThreshold: Number.MAX_VALUE
    });
  }

  /**
   * @returns {Decimal}
   */
  get cost() {
    return this.costScale.calculateCost(Math.floor(this.bought / 10) + this.costBumps);
  }

  /** @returns {number} */
  get costBumps() { return this.data.costBumps; }
  /** @param {number} value */
  set costBumps(value) { this.data.costBumps = value; }

  /**
   * @returns {number}
   */
  get boughtBefore10() {
    return this.bought % 10;
  }

  /**
   * @returns {number}
   */
  get remainingUntil10() {
    return 10 - this.boughtBefore10;
  }

  /**
   * @returns {Decimal}
   */
  get costUntil10() {
    return this.cost.times(this.remainingUntil10);
  }

  get howManyCanBuy() {
    const ratio = this.currencyAmount.dividedBy(this.cost);
    return Decimal.floor(Decimal.max(Decimal.min(ratio, 10 - this.boughtBefore10), 0)).toNumber();
  }

  /**
   * @returns {Decimal}
   */
  get rateOfChange() {
    const tier = this.tier;
    if (tier === 8) return DC.D0;
    let toGain = AntimatterDimension(tier + 1).productionPerSecond;
    return toGain.times(10).dividedBy(this.amount.max(1)).times(getGameSpeedupForDisplay());
  }

  /**
   * @returns {boolean}
   */
  get isProducing() {
    return this.totalAmount.gt(0);
  }

  /**
   * @returns {Decimal}
   */
  get currencyAmount() {
    return Currency.mendingPoints.value;
  }

  /**
   * @param {Decimal} value
   */
  set currencyAmount(value) {
    Currency.mendingPoints.value = value;
  }

  /**
   * @returns {number}
   */
  get continuumValue() {
    return 0;
  }

  /**
   * @returns {number}
   */
  get continuumAmount() {
    return Math.floor(10 * this.continuumValue);
  }

  /**
   * Continuum doesn't continually update dimension amount because that would require making the code
   * significantly messier to handle it properly. Instead an effective amount is calculated here, which
   * is only used for production and checking for boost/galaxy. Doesn't affect achievements.
   * Taking the max is kind of a hack but it seems to work in all cases. Obviously it works if
   * continuum isn't unlocked. If the dimension is being produced and the continuum is unlocked,
   * the dimension will be being produced in large numbers (since the save is endgame), so the amount
   * will be larger than the continuum and so the continuum is insignificant, which is fine.
   * If the dimension isn't being produced, the continuum will be at least the amount, so
   * the continuum will be used and that's fine. Note that when continuum is first unlocked,
   * both 8d amount and 8d continuum will be nonzero until the next infinity, so taking the sum
   * doesn't work.
   * @param {Decimal} value
   */
  get totalAmount() {
    return this.amount.max(this.continuumAmount);
  }

  /**
    * @returns {boolean}
    */
  get isAffordable() {
    return this.cost.lte(this.currencyAmount);
  }

  /**
   * @returns {boolean}
   */
  get isAffordableUntil10() {
    return this.costUntil10.lte(this.currencyAmount);
  }

  get isAvailableForPurchase() {
    return this.isAffordable;
  }

  reset() {
    this.amount = DC.D0;
    this.bought = 0;
    this.costBumps = 0;
  }

  resetAmount() {
    this.amount = DC.D0;
  }

  get multiplier() {
    return DC.D1;//GameCache.antimatterDimensionFinalMultipliers[this.tier].value;
  }

  get cappedProductionInNormalChallenges() {
    return DC.WARP_LIMIT;
  }

  get productionPerSecond() {
    let amount = this.totalAmount;
    let production = amount.times(this.multiplier).times(Tickspeed.perSecond);
    return production;
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

  reset() {
    for (const dimension of MultiversalDimensions.all) {
      dimension.reset();
    }
    GameCache.dimensionMultDecrease.invalidate();
  },

  resetAmountUpToTier(maxTier) {
    for (const dimension of MultiversalDimensions.all.slice(0, maxTier)) {
      dimension.resetAmount();
    }
  },

  get buyTenMultiplier() {
    let mult = DC.D2;
    return mult;
  },

  tick(diff) {
    // Stop producing antimatter at Big Crunch goal because all the game elements
    // are hidden when pre-break Big Crunch button is on screen.
    let maxTierProduced = 7;
    let nextTierOffset = 1;
    for (let tier = maxTierProduced; tier >= 1; --tier) {
      MultiversalDimension(tier + nextTierOffset).produceDimensions(MultiversalDimension(tier), new Decimal(diff).div(10));
    }
    MultiversalDimension(1).produceCurrency(Currency.galBoostPoints, diff);
  }
};
