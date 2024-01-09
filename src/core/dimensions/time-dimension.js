import { DC } from "../constants";

import { DimensionState } from "./dimension";

export function buySingleTimeDimension(tier, auto = false) {
  const dim = TimeDimension(tier);
  if (TimeDimension(tier).bought >= 5e14) return false;
  if (tier > 4) {
    if (!TimeStudy.timeDimension(tier).isBought) return false;
    if (RealityUpgrade(13).isLockingMechanics && Currency.eternityPoints.gte(dim.cost)) {
      if (!auto) RealityUpgrade(13).tryShowWarningModal();
      return false;
    }
  }
  if (Currency.eternityPoints.lt(dim.cost)) return false;
  if (Enslaved.isRunning && dim.bought > 0) return false;
  if (ImaginaryUpgrade(15).isLockingMechanics && EternityChallenge(7).completions > 0) {
    if (!auto) {
      ImaginaryUpgrade(15).tryShowWarningModal(`purchase a Time Dimension,
        which will produce Infinity Dimensions through EC7`);
    }
    return false;
  }

  Currency.eternityPoints.subtract(dim.cost);
  dim.amount = dim.amount.plus(1);
  dim.bought += 1;
  dim.cost = dim.nextCost(dim.bought);
  if(TimeDimension(tier).bought > 5e14) TimeDimension(tier).bought = 5e14;
  return true;
}

export function resetTimeDimensions() {
  for (const dim of TimeDimensions.all) dim.amount = new Decimal(dim.bought);
  updateTimeDimensionCosts();
}

export function fullResetTimeDimensions() {
  for (const dim of TimeDimensions.all) {
    dim.cost = new Decimal(dim.baseCost);
    dim.amount = DC.D0;
    dim.bought = 0;
  }
}

export function toggleAllTimeDims() {
  const areEnabled = Autobuyer.timeDimension(1).isActive;
  for (let i = 1; i < 9; i++) {
    Autobuyer.timeDimension(i).isActive = !areEnabled;
  }
}

export function buyMaxTimeDimension(tier, portionToSpend = 1, isMaxAll = false) {
  const canSpend = Currency.eternityPoints.value.times(portionToSpend);
  const dim = TimeDimension(tier);
  if (canSpend.lt(dim.cost)) return false;
  if (TimeDimension(tier).bought >= 5e14) return false;
  if (tier > 4) {
    if (!TimeStudy.timeDimension(tier).isBought) return false;
    if (RealityUpgrade(13).isLockingMechanics) {
      if (!isMaxAll) RealityUpgrade(13).tryShowWarningModal();
      return false;
    }
  }
  if (ImaginaryUpgrade(15).isLockingMechanics && EternityChallenge(7).completions > 0) {
    if (!isMaxAll) {
      ImaginaryUpgrade(15).tryShowWarningModal(`purchase a Time Dimension,
        which will produce Infinity Dimensions through EC7`);
    }
    return false;
  }
  if (Enslaved.isRunning) return buySingleTimeDimension(tier);
  let bulk = null;
  try{
    bulk = bulkBuyBinarySearch(canSpend, {
      costFunction: bought => dim.nextCost(bought),
      cumulative: true,
      firstCost: dim.cost,
    }, dim.bought);
  }
  catch{
    dim.bought = 5e14;
    return true;
  }
  if (!bulk) return false;
  Currency.eternityPoints.subtract(bulk.purchasePrice);
  dim.amount = dim.amount.plus(bulk.quantity);
  dim.bought += bulk.quantity;
  dim.cost = dim.nextCost(dim.bought);
  if(TimeDimension(tier).bought > 5e14) TimeDimension(tier).bought = 5e14;
  return true;
}

export function maxAllTimeDimensions() {
  // Try to buy single from the highest affordable new dimensions
  for (let i = 8; i > 0 && TimeDimension(i).bought === 0; i--) {
    buySingleTimeDimension(i, true);
  }

  // Buy everything costing less than 1% of initial EP
  for (let i = 8; i > 0; i--) {
    buyMaxTimeDimension(i, 0.01, true);
  }

  // Loop buying the cheapest dimension possible; explicit infinite loops make me nervous
  const unlockedDimensions = TimeDimensions.all.filter(d => d.isUnlocked);
  for (let stop = 0; stop < 1000; stop++) {
    const cheapestDim = unlockedDimensions.reduce((a, b) => (b.cost.gte(a.cost) ? a : b));
    if (!buySingleTimeDimension(cheapestDim.tier, true)) break;
  }
}

export function timeDimensionCommonMultiplier() {
  let mult = new Decimal(ShopPurchase.allDimPurchases.currentMult)
    .timesEffectsOf(
      Achievement(105),
      Achievement(128),
      TimeStudy(93),
      TimeStudy(103),
      TimeStudy(151),
      TimeStudy(221),
      TimeStudy(301),
      EternityChallenge(10).reward,
      EternityUpgrade.tdMultAchs,
      EternityUpgrade.tdMultTheorems,
      EternityUpgrade.tdMultRealTime,
      Replicanti.areUnlocked && Replicanti.amount.gt(1) ? DilationUpgrade.tdMultReplicanti : null,
      Pelle.isDoomed ? null : RealityUpgrade(22),
      AlchemyResource.dimensionality,
      PelleRifts.chaos
    );

  if(!Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(1).completions >= 1){
    mult = mult.timesEffectsOf(EternityChallenge(1).reward);
  }
  if(!Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(10).completions >= 1){
    mult = mult.timesEffectsOf(EternityChallenge(10).reward);
  }
  if (EternityChallenge(9).isRunning) {
    mult = mult.times(
      Decimal.pow(
        Math.clampMin(Currency.infinityPower.value.pow(InfinityDimensions.powerConversionRate / 7).log2(), 1),
        4)
        .clampMin(1));
  }

  if (Ra.unlocks.relicShardBoost.isUnlocked) mult = mult.pow(1 + ((Currency.relicShards.value.clampMin(1)).log10() / 1337));
  if (Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(1).completions >= 1 && !Pelle.isDoomed) mult = mult.pow(EternityChallenge(1).vReward.effectValue);
  if (Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(10).completions >= 1 && !Pelle.isDoomed) mult = mult.pow(EternityChallenge(10).vReward.effectValue);
  if (Ra.unlocks.vAchMilestone2AffectsIDsAndTDs.isUnlocked){
    mult = mult.pow(VUnlocks.adPow.effectOrDefault(1), 0.5);
  }
  return mult;
}

export function updateTimeDimensionCosts() {
  for (let i = 1; i <= 8; i++) {
    const dim = TimeDimension(i);
    dim.cost = dim.nextCost(dim.bought);
  }
}

class TimeDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.time, tier);
    const BASE_COSTS = [null, DC.D1, DC.D5, DC.E2, DC.E3, DC.E2350, DC.E2650, DC.E3000, DC.E3350];
    this._baseCost = BASE_COSTS[tier];
    const COST_MULTS = [null, 3, 9, 27, 81, 24300, 72900, 218700, 656100];
    this._costMultiplier = COST_MULTS[tier];
    const E6000_SCALING_AMOUNTS = [null, 7322, 4627, 3382, 2665, 833, 689, 562, 456];
    this._e6000ScalingAmount = E6000_SCALING_AMOUNTS[tier];
    const COST_THRESHOLDS = [Decimal.NUMBER_MAX_VALUE, DC.E1300, DC.E6000];
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
      if (PelleRifts.paradox.milestones[0].canBeApplied) {
        return cost.div("1e2250").pow(0.5);
      }
      return cost;
    }

    const costMultIncreases = [1, 1.5, 2.2];
    for (let i = 0; i < this._costIncreaseThresholds.length; i++) {
      const cost = Decimal.pow(this.costMultiplier * costMultIncreases[i], bought).times(this.baseCost);
      if (cost.lt(this._costIncreaseThresholds[i])) return cost;
    }

    let base = this.costMultiplier;
    if (this._tier <= 4) base *= 2.2;
    const exponent = this.e6000ScalingAmount + (bought - this.e6000ScalingAmount) * TimeDimensions.scalingPast1e6000;
    const cost = Decimal.pow(base, exponent).times(this.baseCost);

    if (PelleRifts.paradox.milestones[0].canBeApplied && this._tier > 4) {
      return cost.div("1e2250").pow(0.5);
    }
    return cost;
  }

  get isUnlocked() {
    return this._tier < 5 || TimeStudy.timeDimension(this._tier).isBought;
  }

  get isAvailableForPurchase() {
    return this.isAffordable;
  }

  get isAffordable() {
    return Currency.eternityPoints.gte(this.cost);
  }

  get multiplier() {
    const tier = this._tier;

    if (EternityChallenge(11).isRunning) return DC.D1;
    let mult = GameCache.timeDimensionCommonMultiplier.value
      .timesEffectsOf(
        tier === 1 ? TimeStudy(11) : null,
        tier === 3 ? TimeStudy(73) : null,
        tier === 4 ? TimeStudy(227) : null,
        TimeStudy(313),
      );

    const dim = TimeDimension(tier);
    const value = Ra.continuumActive ? dim.continuumValue:dim.bought;
    let x = Ra.unlocks.uncap8TdPurchaseMult.isUnlocked ? false : tier === 8;
    const bought = x ? Math.clampMax(value, 1e8) : value;
    mult = mult.times(Decimal.pow(dim.powerMultiplier, bought));

    mult = mult.pow(getAdjustedGlyphEffect("timepow"));
    mult = mult.pow(getAdjustedGlyphEffect("effarigdimensions"));
    mult = mult.pow(getAdjustedGlyphEffect("curseddimensions"));
    mult = mult.powEffectOf(AlchemyResource.time);
    mult = mult.pow(Ra.momentumValue);
    mult = mult.pow(ImaginaryUpgrade(11).effectOrDefault(1));
    mult = mult.powEffectOf(PelleRifts.paradox);

    if (player.dilation.active || PelleStrikes.dilation.hasStrike) {
      mult = dilatedValueOf(mult);
    }

    if (Effarig.isRunning) {
      mult = Effarig.multiplier(mult);
    } else if (V.isRunning) {
      mult = mult.pow(0.5);
    }

    return mult;
  }

  get productionPerSecond() {
    if (EternityChallenge(1).isRunning || EternityChallenge(10).isRunning ||
    (Laitela.isRunning && this.tier > Laitela.maxAllowedDimension)) {
      return DC.D0;
    }
    if (EternityChallenge(11).isRunning) {
      return this.totalAmount;
    }
    let production = this.totalAmount.times(this.multiplier);
    if (EternityChallenge(7).isRunning) {
      production = production.times(Tickspeed.perSecond);
    }
    if (this._tier === 1 && !EternityChallenge(7).isRunning) {
      production = production.pow(getAdjustedGlyphEffect("timeshardpow"));
    }
    return production;
  }

  get rateOfChange() {
    const tier = this._tier;
    if (tier === 8) {
      return DC.D0;
    }
    const toGain = TimeDimension(tier + 1).productionPerSecond;
    const current = Decimal.max(this.totalAmount, 1);
    return toGain.times(10).dividedBy(current).times(getGameSpeedupForDisplay());
  }

  get isProducing() {
    const tier = this.tier;
    if (EternityChallenge(1).isRunning ||
      EternityChallenge(10).isRunning ||
      (Laitela.isRunning && tier > Laitela.maxAllowedDimension)) {
      return false;
    }
    return this.totalAmount.gt(0);
  }

  get baseCost() {
    return this._baseCost;
  }

  get costMultiplier() {
    return this._costMultiplier;
  }

  get powerMultiplier() {
    return DC.D4
      .timesEffectsOf(this._tier === 8 ? GlyphSacrifice.time : null)
      .pow(ImaginaryUpgrade(14).effectOrDefault(1));
  }

  get e6000ScalingAmount() {
    return this._e6000ScalingAmount;
  }

  get costIncreaseThresholds() {
    return this._costIncreaseThresholds;
  }

  get requirementReached() {
    return this._tier < 5 ||
      (TimeStudy.timeDimension(this._tier).isAffordable && TimeStudy.timeDimension(this._tier - 1).isBought);
  }

  get purchaseCap() {
    let pC=5e14;
    if (player.timestudy.studies.includes(310)) pC = pC * (Math.max(Math.sqrt(Math.log10(Currency.replicanti.value.exponent)),1))
    return pC;
  }

  get isCapped() {
    return this.bought >= this.purchaseCap;
  }

  get continuumValue() {
    if(Pelle.isDoomed) return 0;
    if(!this.isUnlocked) return 0;
    if(!Ra.continuumActive) return 0;
    const firstThreshold = [null, 647, 323, 214, 160, 0, 0, 0, 0][this.tier];
    const secondThreshold = [null, 1991, 1150, 808, 623, 0, 0, 0, 0][this.tier];
    const e6kThreshold = this.e6000ScalingAmount;
    const mult = this.costMultiplier;

    const logMoney = Currency.eternityPoints.value.log10();
    let logMult = Math.log10(mult);
    let logBase = this.baseCost.log10();
    let contValue = (logMoney - logBase)/logMult;

    if(this.tier < 5){
      if(contValue > firstThreshold){
        logMult = Math.log10(mult*1.5);
        logBase = this.nextCost(firstThreshold).log10();
        contValue = firstThreshold + (logMoney - logBase)/logMult;
      }
      if(contValue > secondThreshold){
        logMult = Math.log10(mult*2.2);
        logBase = this.nextCost(firstThreshold).log10();
        contValue = secondThreshold + (logMoney - logBase)/logMult;
      }
    }
    contValue = Math.min(contValue, (contValue-e6kThreshold)/TimeDimensions.scalingPast1e6000 + e6kThreshold);
    contValue *= 1 + Laitela.matterExtraPurchaseFactor;
    contValue = Math.clampMax(contValue, this.purchaseCap);
    return Math.clampMin(contValue, 0);
  }

  get totalAmount(){
    return this.amount.max(this.continuumValue);
  }

  tryUnlock() {
    if (this.isUnlocked) return;
    TimeStudy.timeDimension(this._tier).purchase();
  }
}

/**
 * @function
 * @param {number} tier
 * @return {TimeDimensionState}
 */
export const TimeDimension = TimeDimensionState.createAccessor();

export const TimeDimensions = {
  /**
   * @type {TimeDimensionState[]}
   */
  all: TimeDimension.index.compact(),

  get scalingPast1e6000() {
    return 4;
  },

  tick(diff) {
    for (let tier = 8; tier > 1; tier--) {
      TimeDimension(tier).produceDimensions(TimeDimension(tier - 1), new Decimal(diff).div(10));
    }

    if (EternityChallenge(7).isRunning) {
      TimeDimension(1).produceDimensions(InfinityDimension(8), diff);
    } else {
      TimeDimension(1).produceCurrency(Currency.timeShards, diff);
    }

    if(!Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(7).completions >= 1){ EternityChallenge(7).reward.applyEffect(production => {
      InfinityDimension(8).amount = InfinityDimension(8).amount.plus(production.times(new Decimal(diff).div(1000)));
    });
  }
  }
};

export function tryUnlockTimeDimensions() {
  if (TimeDimension(8).isUnlocked) return;
  for (let tier = 5; tier <= 8; ++tier) {
    if (TimeDimension(tier).isUnlocked) continue;
    TimeDimension(tier).tryUnlock();
  }
}
