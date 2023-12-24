export const GALAXY_TYPE = {
  NORMAL: 0,
  DISTANT: 1,
  REMOTE: 2,
  THIRD: 3
};

class GalaxyRequirement {
  constructor(tier, amount) {
    this.tier = tier;
    this.amount = amount;
  }

  get isSatisfied() {
    const dimension = AntimatterDimension(this.tier);
    return dimension.totalAmount.gte(this.amount);
  }
}

export class Galaxy {
  static get scalingThreeStart(){
    let x = (Ra.unlocks.improvedECRewards.isUnlocked && EternityChallenge(5).completions >= 1) ? EternityChallenge(5).vReward.effectValue : 0;
    return 750000 + (5000 * MendingUpgrade(16).boughtAmount) + x;
  }
  static get remoteStart() {
    return MendingUpgrade(17).isBought ? Infinity : RealityUpgrade(21).effectOrDefault(800);
  }

  static get requirement() {
    return this.requirementAt(player.galaxies);
  }

  /**
   * Figure out what galaxy number we can buy up to
   * @param {number} currency Either dim 8 or dim 6, depends on current challenge
   * @returns {number} Max number of galaxies (total)
   */
  static buyableGalaxies(currency) {
    let bulk = null;
    try{
      bulk = bulkBuyBinarySearch(new Decimal(currency), {
        costFunction: x => this.requirementAt(x).amount,
        cumulative: false,
      }, player.galaxies);
    }
    catch{
      return 1e9;
    }
    if (!bulk) throw new Error("Unexpected failure to calculate galaxy purchase");
    return player.galaxies + bulk.quantity;
  }

  static requirementAt(galaxies) {
    let amount = Galaxy.baseCost + (galaxies * Galaxy.costMult);

    const type = Galaxy.typeAt(galaxies);

    if (type === GALAXY_TYPE.DISTANT && EternityChallenge(5).isRunning) {
      amount += Math.pow(galaxies, 2) + galaxies;
    } else if (type === GALAXY_TYPE.DISTANT || type === GALAXY_TYPE.REMOTE) {
      const galaxyCostScalingStart = this.costScalingStart;
      const galaxiesBeforeDistant = Math.clampMin(galaxies - galaxyCostScalingStart + 1, 0);
      amount += Math.pow(galaxiesBeforeDistant, 2) + galaxiesBeforeDistant;
    }

    if (type === GALAXY_TYPE.REMOTE) {
      amount *= Math.pow(1.002, galaxies - (Galaxy.remoteStart - 1));
    }

    if (type === GALAXY_TYPE.THIRD) {
      /* This seems like a shit ton of math, so let me break it down:
      First, we find out what polynomial we want (whether we want quartic (4th degree), quintic (5th degree) or hextic (6th degree))
      From there, we do the polynomial that is equal to doing (b += a; c += b; d += c... (where the last letter is the nth degree + 1 in the alphabet))
      where all numbers start at 2. In the case of hextic, its x^6/360 + x^5/24 + 17x^4/72 + 5x^3/8 + 137x^2/180 + x/3
      In the case of quintic, it is x^5/60 + x^4/12 + x^3/12 - x^2/12 - x/10
      In the case of quartic, it is x^4/12 + x^3/2 + 11x^2/12 + x/2
      */
     let polynomialLvl = 6
      if (WarpUpgrade(4).isBought) { polynomialLvl -= 1 }
      if (WarpUpgrade(11).isBought) { polynomialLvl -= 1 }
      if (polynomialLvl == 6) {
        let n = Math.max(galaxies - Galaxy.scalingThreeStart, 0);
        let a = n ** 6;
        let b = 15 * (n ** 5);
        let c = 85 * (n ** 4);
        let d = 225 * (n ** 3);
        let e = 274 * (n ** 2)
        amount += (a + b + c + d + e + (120 * n)) / 360;
      }
      if (polynomialLvl == 5) {
        let n = Math.max(galaxies - Galaxy.scalingThreeStart, 0);
        let a = n ** 5;
        let b = 5 * (n ** 4);
        let c = 5 * (n ** 3);
        let d = 5 * (n ** 2);
        amount += (a + b + c - d - (6 * n)) / 60;
      }
      if (polynomialLvl == 4) {
        let n = Math.max(galaxies - Galaxy.scalingThreeStart, 0);
        let a = n ** 4;
        let b = 6 * (n ** 3);
        let c = 11 * (n ** 2);
        amount += (a + b + c + (6 * n)) / 12;
      }
      //amount *= Math.pow(Math.pow(1.002, galaxies - (Galaxy.scalingThreeStart - 1)), 2);
    }

    amount -= Effects.sum(InfinityUpgrade.resetBoost);
    if (InfinityChallenge(5).isCompleted) amount -= 1;

    if (GlyphAlteration.isAdded("power")) amount *= getSecondaryGlyphEffect("powerpow");

    amount = Math.floor(amount);
    const tier = Galaxy.requiredTier;
    return new GalaxyRequirement(tier, amount);
  }

  static get costMult() {
    return Effects.min(NormalChallenge(10).isRunning ? 90 : 60, TimeStudy(42));
  }

  static get baseCost() {
    return NormalChallenge(10).isRunning ? 99 : 80;
  }

  static get requiredTier() {
    return NormalChallenge(10).isRunning ? 6 : 8;
  }

  static get canBeBought() {
    if (EternityChallenge(6).isRunning && !Enslaved.isRunning) return false;
    if (NormalChallenge(8).isRunning || InfinityChallenge(7).isRunning) return false;
    if (player.records.thisInfinity.maxAM.gt(Player.infinityGoal) &&
       (!player.break || Player.isInAntimatterChallenge)) return false;
    return true;
  }

  static get lockText() {
    if (this.canBeBought) return null;
    if (EternityChallenge(6).isRunning) return "Locked (Eternity Challenge 6)";
    if (InfinityChallenge(7).isRunning) return "Locked (Infinity Challenge 7)";
    if (InfinityChallenge(1).isRunning) return "Locked (Infinity Challenge 1)";
    if (NormalChallenge(8).isRunning) return "Locked (8th Antimatter Dimension Autobuyer Challenge)";
    return null;
  }

  static get costScalingStart() {
    let x = 100 + TimeStudy(302).effectOrDefault(0) + Effects.sum(
      TimeStudy(223),
      TimeStudy(224),
      GlyphSacrifice.power
    );
    if(!Ra.unlocks.improvedECRewards.isunlocked && EternityChallenge(5).completions >= 1) x += EternityChallenge(5).reward.effectValue;
    return x;
  }

  static get type() {
    return this.typeAt(player.galaxies);
  }

  static typeAt(galaxies) {
    if (galaxies >= Galaxy.scalingThreeStart) {
      return GALAXY_TYPE.THIRD;
    }
    if (galaxies >= Galaxy.remoteStart) {
      return GALAXY_TYPE.REMOTE;
    }
    if (EternityChallenge(5).isRunning || galaxies >= this.costScalingStart) {
      return GALAXY_TYPE.DISTANT;
    }
    return GALAXY_TYPE.NORMAL;
  }
}

function galaxyReset() {
  EventHub.dispatch(GAME_EVENT.GALAXY_RESET_BEFORE);
  player.galaxies++;
  if (!Achievement(143).isUnlocked || (Pelle.isDoomed && !PelleUpgrade.galaxyNoResetDimboost.canBeApplied)) {
    player.dimensionBoosts = 0;
  }
  softReset(0);
  if (Notations.current === Notation.emoji) player.requirementChecks.permanent.emojiGalaxies++;
  // This is specifically reset here because the check is actually per-galaxy and not per-infinity
  player.requirementChecks.infinity.noSacrifice = true;
  EventHub.dispatch(GAME_EVENT.GALAXY_RESET_AFTER);
}

export function manualRequestGalaxyReset(bulk) {
  if (!Galaxy.canBeBought || !Galaxy.requirement.isSatisfied) return;
  if (GameEnd.creditsEverClosed && !PlayerProgress.mendingUnlocked()) return;
  if (RealityUpgrade(7).isLockingMechanics && player.galaxies > 0) {
    RealityUpgrade(7).tryShowWarningModal();
    return;
  }
  if (player.options.confirmations.antimatterGalaxy) {
    Modal.antimatterGalaxy.show({ bulk: bulk && EternityMilestone.autobuyMaxGalaxies.isReached });
    return;
  }
  requestGalaxyReset(bulk);
}

// All galaxy reset requests, both automatic and manual, eventually go through this function; therefore it suffices
// to restrict galaxy count for RUPG7's requirement here and nowhere else
export function requestGalaxyReset(bulk, limit = Number.MAX_VALUE) {
  const restrictedLimit = RealityUpgrade(7).isLockingMechanics ? 1 : limit;
  if (EternityMilestone.autobuyMaxGalaxies.isReached && bulk) return maxBuyGalaxies(restrictedLimit);
  if (player.galaxies >= restrictedLimit || !Galaxy.canBeBought || !Galaxy.requirement.isSatisfied) return false;
  Tutorial.turnOffEffect(TUTORIAL_STATE.GALAXY);
  galaxyReset();
  return true;
}

function maxBuyGalaxies(limit = Number.MAX_VALUE) {
  if (player.galaxies >= limit || !Galaxy.canBeBought) return false;
  // Check for ability to buy one galaxy (which is pretty efficient)
  const req = Galaxy.requirement;
  if (!req.isSatisfied) return false;
  const dim = AntimatterDimension(req.tier);
  const newGalaxies = Math.clampMax(
    Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())),
    limit);
  if (Notations.current === Notation.emoji) {
    player.requirementChecks.permanent.emojiGalaxies += newGalaxies - player.galaxies;
  }
  // Galaxy count is incremented by galaxyReset(), so add one less than we should:
  player.galaxies = newGalaxies - 1;
  galaxyReset();
  if (Enslaved.isRunning && player.galaxies > 1) EnslavedProgress.c10.giveProgress();
  Tutorial.turnOffEffect(TUTORIAL_STATE.GALAXY);
  return true;
}
