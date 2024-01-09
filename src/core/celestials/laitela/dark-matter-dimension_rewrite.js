import { DC } from "../../constants";
import { DimensionState } from "../../dimensions/dimension";
import { TimeStudy } from "../../time-studies/normal-time-study";

// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND
// THIS IS THE ONE THAT NEEDS TO REPLACE dark-matter-dimension.js NOT THE OTHER WAY ROUND

// I've decided to just bite the bullet and rewrite the entire dmd code
// Hopefully this doesnt cause issues (foreshadowing)

// Just use these constants for simplicity sake and still gives us room to modify shit if needed, ill add more constants at some point (i wont)
const INTERVAL_COST_MULT = 5;
const POWER_DM_COST_MULT = 10;
const POWER_DE_COST_MULTS = [1.65, 1.6, 1.55, 1.5, 1.45, 1.4, 1.35, 1.3];

const INTERVAL_START_COST = 10;
const POWER_DM_START_COST = 10;
const POWER_DE_START_COST = 10;

const INTERVAL_PER_UPGRADE = 0.92;

export const POWER_DM_PER_ASCENSION = 500;
export const POWER_DE_PER_ASCENSION = 500;

const COST_MULT_PER_TIER = 1200;

export class DarkMatterDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.celestials.laitela.dimensions, tier);
  }

  productionForDiff(diff) {
    return this.productionPerSecond * diff / 1000;
  }

  get productionPerSecond() { return this.deGain * 1000 / this.interval; }

get unlockUpgrade() {
  return ImaginaryUpgrade(14 + this.tier)
} // Need to do this, for compatability

get isUnlocked() {
  if (this.tier < 5) {
    return ImaginaryUpgrade(14 + this.tier) || Ra.pets.laitela.level >= 25 // Fuck it here's some lazy coding
  }
  return ((Ra.pets.laitela.level / 25) >= (this.tier - 4))
}

get ascensions() {
  return this.data.ascensionCount;
}

get intervalPurchaseCap() {
  return 10;
}

get powerDMPerAscension() {
  return POWER_DM_PER_ASCENSION + SingularityMilestone.improvedAscensionDM.effectOrDefault(0);
} // bunch of copy paste so i rewrite as little code as possible

get startingInterval() {
  const perUpgrade = INTERVAL_PER_UPGRADE;
  const tierFactor = Math.pow(4, this.tier - 1);
  return 1000 * tierFactor * Math.pow(perUpgrade, this.data.intervalUpgrades) *
    Math.pow(SingularityMilestone.ascensionIntervalScaling.effectOrDefault(1200), this.ascensions) *
    SingularityMilestone.darkDimensionIntervalReduction.effectOrDefault(1);
}

get dmdCommonMultiplier() {
  return DC.D1.timesEffectsOf(
    SingularityMilestone.darkFromTesseracts,
    SingularityMilestone.darkFromGlyphLevel,
    SingularityMilestone.darkFromTheorems,
    SingularityMilestone.darkFromDM4,
    SingularityMilestone.darkFromGamespeed,
    SingularityMilestone.darkFromDilatedTime
  );
}

get dmGain() {
  if (!this.isUnlocked) return new Decimal(0);
  return new Decimal(1 + 2 * Math.pow(1.15, this.data.powerDMUpgrades))
    .times(Laitela.realityReward)
    .times(Laitela.darkMatterMult)
    .times(this.commonDarkMult)
    .times(Math.pow(this.powerDMPerAscension, this.ascensions))
    .timesEffectsOf(
      SingularityMilestone.darkMatterMult,
      SingularityMilestone.multFromInfinitied,
      TimeStudy(308))
    .dividedBy(Math.pow(1e4, Math.pow(this.tier - 1, 0.5)));
}

get deGain() {
  if (!this.isUnlocked || Pelle.isDoomed) return 0;
  const tierFactor = Math.pow(15, this.tier - 1);
  const destabilizeBoost = Laitela.isFullyDestabilized ? 8 : 1;
  const MMBoostDE = MendingMilestone.one.isReached ? 50 : 1;
  return new Decimal(((1 + this.data.powerDEUpgrades * 0.1) *
    Math.pow(1.005, this.data.powerDEUpgrades)) * tierFactor / 1000)
    .times(this.commonDarkMult)
    .times(Math.pow(POWER_DE_PER_ASCENSION, this.ascensions))
    .timesEffectsOf(
      SingularityMilestone.darkEnergyMult,
      SingularityMilestone.realityDEMultiplier,
      SingularityMilestone.multFromInfinitied,
      TimeStudy(308)
    ).toNumber() * destabilizeBoost * MMBoostDE;
}

get ascInterval() {
  return Math.pow(4, this.tier - 1) * Math.clampMin(this.intervalPurchaseCap, SingularityMilestone.ascensionIntervalScaling.effectOrDefault(1200) *
    this.startingInterval * Math.pow(INTERVAL_PER_UPGRADE, purchases)) * 1000
}

get adjustedStartingCost() {
  const tiers = [null, 0, 2, 5, 13, 34, 89, 233, 610];
  return new Decimal(10).times(Decimal.pow(COST_MULT_PER_TIER, tiers[this.tier]).times(SingularityMilestone.darkDimensionCostReduction.effectOrDefault(1)));
}

get baseIntervalCost() {
  return new Decimal(INTERVAL_COST_MULT).times(this.adjustedStartingCost).times(INTERVAL_START_COST).floor();
}

get baseDMCost() {
  return new Decimal(POWER_DM_COST_MULT).times(this.adjustedStartingCost).times(POWER_DM_START_COST).floor();
}

get baseDECost() {
  return new Decimal(POWER_DE_COST_MULTS[this.tier]).times(this.adjustedStartingCost).times(POWER_DE_START_COST).floor();
}

  /**
   * @returns {ExponentialCostScaling}
   */
  get dmCostScale() {
    return new ExponentialCostScaling({
      baseCost: this.baseDMCost,
      baseIncrease: POWER_DM_COST_MULT,
      costScale: 7,
      scalingCostThreshold: this.adjustedStartingCost.pow(0.5).times(Number.MAX_VALUE)
    });
  }

  get deCostScale() {
    return new ExponentialCostScaling({
      baseCost: this.baseDECost,
      baseIncrease: POWER_DE_COST_MULTS[this.tier],
      costScale: 11,
      scalingCostThreshold: this.adjustedStartingCost.pow(0.5).times(Number.MAX_VALUE)
    });
  }

  get intervalCostScale() {
    return new ExponentialCostScaling({
      baseCost: this.baseIntervalCost,
      baseIncrease: INTERVAL_COST_MULT,
      costScale: 14,
      scalingCostThreshold: this.adjustedStartingCost.pow(0.5).times(Number.MAX_VALUE)
    });
  }

  get intervalAfterAscension() {
    buyManyInterval()
    return this.interval
  }

  /**
   * @returns {Decimal}
   */
  get dmCost() {
    return this.dmCostScale.calculateCost(Math.floor(this.data.powerDMUpgrades));
  }

  get deCost() {
    return this.deCostScale.calculateCost(Math.floor(this.data.powerDEUpgrades));
  }

  get intervalCost() {
    return this.intervalCostScale.calculateCost(Math.floor(this.data.intervalUpgrades));
  }

  //copy paste babyyyyyyyyy

  get maxIntervalPurchases() {
    return Math.ceil(Math.log(this.intervalPurchaseCap / this.interval) / Math.log(INTERVAL_PER_UPGRADE));
  }

  buyManyInterval(x) {
    if (x > this.maxIntervalPurchases) return false;
    const cost = this.intervalCost;
    if (!Currency.darkMatter.purchase(cost)) return false;
    this.data.intervalUpgrades += x;
    return true;
  }

  buyManyPowerDM(x) {
    const cost = this.dmCost;
    if (!Currency.darkMatter.purchase(cost)) return false;
    this.data.powerDMUpgrades += x;
    return true;
  }

  buyManyPowerDE(x) {
    const cost = this.deCost;
    if (!Currency.darkMatter.purchase(cost)) return false;
    this.data.powerDEUpgrades += x;
    return true;
  }

  buyInterval() {
    return this.buyManyInterval(1);
  }

  buyPowerDM() {
    return this.buyManyPowerDM(1);
  }

  buyPowerDE() {
    return this.buyManyPowerDE(1);
  }

  ascend() {
    if (this.interval > this.intervalPurchaseCap) return;
    this.data.ascensionCount++;

    // Immediately buy as many interval upgrades as possible
    while (this.buyInterval());
  }

  static get dimensionCount() { return 8; }

  reset() {
    this.data.amount = DC.D1;
    this.data.intervalUpgrades = 0;
    this.data.powerDMUpgrades = 0;
    this.data.powerDEUpgrades = 0;
    this.data.timeSinceLastUpdate = 0;
    this.data.ascensionCount = 0;
  }
};

/**
 * @function
 * @param {number} tier
 * @return {DarkMatterDimensionState}
 */
export const DarkMatterDimension = DarkMatterDimensionState.createAccessor();

export const DarkMatterDimensions = {
  /**
   * @type {DarkMatterDimension[]}
   */
  all: DarkMatterDimension.index.compact(),

  tick(realDiff) {
    if (!Laitela.isUnlocked) return;
    for (let tier = 8; tier >= 1; tier--) {
      const dim = DarkMatterDimension(tier);
      if (!dim.isUnlocked) continue;
      dim.timeSinceLastUpdate += realDiff;
      if (dim.interval < dim.timeSinceLastUpdate) {
        const ticks = Math.floor(dim.timeSinceLastUpdate / dim.interval);
        const productionDM = dim.amount.times(ticks).times(dim.dmGain).timesEffectsOf(
          TimeStudy(308),
        );
        if (tier === 1) {
          Currency.darkMatter.add(productionDM);
        } else {
          DarkMatterDimension(tier - 1).amount = DarkMatterDimension(tier - 1).amount.plus(productionDM);
        }
        Currency.darkEnergy.add(ticks * dim.deGain);
        dim.timeSinceLastUpdate -= dim.interval * ticks;
      }
    }
    if (SingularityMilestone.dim4Generation.canBeApplied && Laitela.annihilationUnlocked) {
      DarkMatterDimension(Math.floor(Ra.pets.laitela.level / 25) + 4).amount = DarkMatterDimension(Math.floor(Ra.pets.laitela.level / 25) + 4).amount
        .plus(SingularityMilestone.dim4Generation.effectValue * realDiff / 1000);
    }
    if (Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(7).completions >= 1) {
      DarkMatterDimension(1).produceDimensions(TimeDimension(8), realDiff / 50);
    }
  },

  reset() {
    for (const dimension of DarkMatterDimensions.all) {
      dimension.reset();
    }
    Currency.darkMatter.reset();
  },
};
