import { DC } from "../constants";
import { CorruptionUpgrade, KohlerInfinityUpgrade, KohlerProgressUnlocks, KohlerUpgrade, V } from "../globals";
import { corruptionPenalties } from "../secret-formula/mending/corruption";
import { DimensionState } from "./dimension";

// Multiplier applied to all Antimatter Dimensions, regardless of tier. This is cached using a Lazy
// and invalidated every update.
export function matterDimensionCommonMultiplier() {
  let multiplier = DC.D1;
  return multiplier;
}

export function energyGainMult(){
  let x = DC.D1;
  x = x.timesEffectsOf(MatterUpgrade(19), KohlerInfinityUpgrade(16), KohlerInfinityUpgrade(20));
  return x;
}

export function getMatterDimensionFinalMultiplierUncached(tier) {
  if (tier < 1 || tier > 4) throw new Error(`Invalid Matter Dimension tier ${tier}`);
  let multiplier = DC.D1;
  multiplier = multiplier.times(applyMDMultipliers(multiplier, tier));
  return multiplier;
}

function applyMDMultipliers(mult, tier) {
  let multiplier = mult.times(GameCache.matterDimensionCommonMultiplier.value);
  let buy10Value = Math.floor(MatterDimension(tier).bought / 10);

  multiplier = multiplier.times(Decimal.pow(MatterDimensions.buyTenMultiplier, buy10Value));
  multiplier = multiplier.times(Decimal.pow(matterBoostPower(tier), matterBoostAmount(tier)));
  if (tier === 1){
    multiplier = multiplier.timesEffectOf(KohlerInfinityUpgrade(19));
  }

  multiplier = multiplier.clampMin(1);

  return multiplier;
}

function applyMDPowers(mult, tier) {
  let multiplier = mult;
  return multiplier;
}

function onBuyDimension(tier) {

}

export function matterBoostPower(tier){
  let x = 10;
  return x;
}

export function buyOneMatterDimension(tier) {
  const dimension = MatterDimension(tier);
  if (!dimension.isAvailableForPurchase || !dimension.isAffordable) return false;
  const cost = dimension.cost;
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);

  /*if (dimension.boughtBefore10 === 9) {
    dimension.challengeCostBump();
  }*/

  dimension.amount = dimension.amount.plus(1);
  dimension.bought++;
  onBuyDimension(tier);

  return true;
}

export function buyMatterBoost(tier) {
  const dimension = MatterDimension(tier);
  if (!dimension.isBoostAffordable) return false;
  const boostCost = dimension.boostCost;
  Currency.energy.value = Currency.energy.value.minus(boostCost);

  /*if (dimension.boughtBefore10 === 9) {
    dimension.challengeCostBump();
  }*/

  player.dimensions.matter[tier - 1].matterBoosts++;
  //dimension.boughtBoosts++;
  return true;
}

export function buyManyMatterDimension(tier) {
  const dimension = MatterDimension(tier);
  if (!dimension.isAvailableForPurchase || !dimension.isAffordableUntil10) return false;
  const cost = dimension.costUntil10;
  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.amount = dimension.amount.plus(dimension.remainingUntil10);
  dimension.bought += dimension.remainingUntil10;

  onBuyDimension(tier);

  return true;
}

export function buyAsManyMDAsYouCanBuy(tier) {
  const dimension = MatterDimension(tier);
  const howMany = dimension.howManyCanBuy;
  const cost = dimension.cost.times(howMany);

  dimension.currencyAmount = dimension.currencyAmount.minus(cost);
  dimension.amount = dimension.amount.plus(howMany);
  dimension.bought += howMany;

  onBuyDimension(tier);

  return true;
}

// This function doesn't do cost checking as challenges generally modify costs, it just buys and updates dimensions
function buyUntilTen(tier) {
  const dimension = MatterDimension(tier);
  dimension.challengeCostBump();
  dimension.amount = Decimal.round(dimension.amount.plus(dimension.remainingUntil10));
  dimension.bought += dimension.remainingUntil10;
  onBuyDimension(tier);
}

export function maxAllMatterDims() {
  //player.requirementChecks.infinity.maxAll = true;
  for (let tier = 1; tier < 5; tier++) {
    buyMaxMatterDimension(tier);
  }

  // Do this here because tickspeed might not have been unlocked before
  // (and maxAll might have unlocked it by buying dimensions).
}

export function buyMaxMatterDimension(tier, bulk = Infinity) {
  const dimension = MatterDimension(tier);
  const cost = dimension.costUntil10;
  let bulkLeft = bulk;

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

export function matterBoostAmount(tier){
  return player.dimensions.matter[tier - 1].matterBoosts;
}

export function energyEffect(){
  let x = new Decimal((Currency.energy.value.clampMin(1)).log10()).pow(new Decimal(0.1).timesEffectOf(KohlerInfinityUpgrade(17))).clampMin(1);
  return x;
}

class MatterDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.matter, tier);
    const BASE_COSTS = [null, 1e15, 1e20, 1e25, 1e30];
    this._baseCost = BASE_COSTS[tier];
    const BASE_COST_MULTIPLIERS = [null, 1e3, 1e4, 1e5, 1e6];
    this._baseCostMultiplier = BASE_COST_MULTIPLIERS[tier];
    const BASE_BOOST_COSTS = [null, 1e20, 1e40, 1e60, 1e80];
    this._baseBoostCost = BASE_BOOST_COSTS[tier];
    const BASE_BOOST_COST_MULTIPLIERS = [null, 1e10, 1e20, 1e30, 1e40];
    this._baseBoostCostMultiplier = BASE_BOOST_COST_MULTIPLIERS[tier];
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
   * @returns {ExponentialCostScaling}
   */
    get boostCostScale() {
      return new ExponentialCostScaling({
        baseCost: this._baseBoostCost,
        baseIncrease: this._baseBoostCostMultiplier,
        costScale: Player.dimensionMultDecrease,
        scalingCostThreshold: Number.MAX_VALUE
      });
    }

  /**
   * @returns {Decimal}
   */
  get cost() {
    let primeAnswer = this.costScale.calculateCost(Math.floor(this.bought / 10) + this.costBumps);
    return primeAnswer;
  }

  get boostCost() {
    let primeAnswer = this.boostCostScale.calculateCost(matterBoostAmount(this.tier) + this.boostCostBumps);
    return primeAnswer;
  }

  /** @returns {number} */
  get costBumps() { return this.data.costBumps; }
  /** @param {number} value */
  set costBumps(value) { this.data.costBumps = value; }

  /** @returns {number} */
  get boostCostBumps() { return this.data.boostCostBumps; }
  /** @param {number} value */
  set boostCostBumps(value) { this.data.boostCostBumps = value; }

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
    let toGain;
    toGain = MatterDimension(tier + 1).productionPerSecond;
    return toGain.times(10).dividedBy(this.amount.max(1)).times(getGameSpeedupForDisplay());
  }

  /**
   * @returns {boolean}
   */
  get isProducing() {
    return this.totalAmount.gt(0) && Kohler.isRunning;
  }

  /**
   * @returns {Decimal}
   */
  get currencyAmount() {
    return Currency.matter.value;
  }

  /**
   * @param {Decimal} value
   */
  set currencyAmount(value) {
    Currency.matter.value = value;
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
    return 0;
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
    return this.cost.lte(this.currencyAmount) && Kohler.isRunning;
  }

  /**
    * @returns {boolean}
    */
  get isBoostAffordable() {
    return this.boostCost.lte(Currency.energy.value) && Kohler.isRunning;
  }

  /**
   * @returns {boolean}
   */
  get isAffordableUntil10() {
    return this.costUntil10.lte(this.currencyAmount) && Kohler.isRunning;
  }

  get isAvailableForPurchase() {
    return Kohler.isRunning;
  }

  reset() {
    this.amount = DC.D0;
    this.bought = 0;
    this.costBumps = 0;
    this.boostCostBumps = 0;
  }

  resetAmount() {
    this.amount = DC.D0;
  }

  multiplySameCosts() {
    for (const dimension of MatterDimensions.all.filter(dim => dim.tier !== this.tier)) {
      if (dimension.cost.e === this.cost.e) {
        dimension.costBumps++;
      }
    }
  }

  get multiplier() {
    return GameCache.matterDimensionFinalMultipliers[this.tier].value;
  }

  get cappedProductionInNormalChallenges() {
    return DC.WARP_LIMIT;
  }

  get productionPerSecond() {
    const tier = this.tier;
    let amount = this.totalAmount;
    let production = amount.times(this.multiplier);
    production = production.min(this.cappedProductionInNormalChallenges);
    return production;
  }
}

/**
 * @function
 * @param {number} tier
 * @return {MatterDimensionState}
 */
export const MatterDimension = MatterDimensionState.createAccessor();

export const MatterDimensions = {
  /**
   * @type {MatterDimensionState[]}
   */
  all: MatterDimension.index.compact(),

  reset() {
    this.resetAmountUpToTier(4);
    for (let j = 1; j < 5; j++){
      MatterDimension(j).bought = 0;
      MatterDimension(j).costBumps = 0;
      MatterDimension(j).boostCostBumps = 0;
      player.dimensions.matter[j - 1].matterBoosts = 0;
      Currency.weakMatter.reset();
      Currency.energy.reset();
    }
    GameCache.dimensionMultDecrease.invalidate();
  },

  resetAmountUpToTier(maxTier) {
    for (const dimension of MatterDimensions.all.slice(0, maxTier)) {
      dimension.resetAmount();
    }
  },

  get buyTenMultiplier() {
    let mult = DC.D2
    return mult;
  },

  tick(diff) {
    for (let tier = 4; tier > 1; tier--) {
      MatterDimension(tier).produceDimensions(MatterDimension(tier - 1), new Decimal(diff).div(10));
    }
    MatterDimension(1).produceCurrency(Currency.weakMatter, diff);
    Currency.energy.add(Currency.weakMatter.value.times(energyGainMult()));
  }
};
