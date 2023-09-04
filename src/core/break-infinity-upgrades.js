import { GameMechanicState, RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { SpeedrunMilestones } from "./speedrun";

class ChargedBreakInfinityUpgradeState extends GameMechanicState {
  constructor(config, upgrade) {
    super(config);
    this._upgrade = upgrade;
  }

  get isEffectActive() {
    return this._upgrade.isBought && this._upgrade.isCharged;
  }
}

export class BreakInfinityUpgradeState extends SetPurchasableMechanicState {
  constructor(config){
    super(config);
    if (config.charged) {
      this._chargedEffect = new ChargedBreakInfinityUpgradeState(config.charged, this);
    }
  }

  get currency() {
    return Currency.infinityPoints;
  }

  get set() {
    return player.infinityUpgrades;
  }

  get isEffectActive() {
    return this.isBought && !this.isCharged;
  }

  get chargedEffect() {
    return this._chargedEffect;
  }

  onPurchased() {
    if (this.id === "postGalaxy") {
      SpeedrunMilestones(7).tryComplete();
      PelleStrikes.powerGalaxies.trigger();
    }
  }

  purchase() {
    if (super.purchase()) {
      EventHub.dispatch(GAME_EVENT.BREAK_INFINITY_UPGRADE_BOUGHT);
      return true;
    }
    if (this.canCharge) {
      this.charge();
      EventHub.dispatch(GAME_EVENT.BREAK_INFINITY_UPGRADE_CHARGED);
      return true;
    }
    return false;
  }

  get hasChargeEffect() {
    return this.config.charged !== undefined;
  }

  get isCharged() {
    return player.celestials.ra.breakCharged.has(this.id);
  }

  get canCharge() {
    return this.isBought &&
      this.hasChargeEffect &&
      !this.isCharged &&
      Ra.breakChargesLeft !== 0 &&
      !Pelle.isDisabled("chargedBreakInfinityUpgrades");
  }

  charge() {
    player.celestials.ra.breakCharged.add(this.id);
  }

  disCharge() {
    player.celestials.ra.breakCharged.delete(this.id);
  }
}

export function disChargeAllBreak(){
  const upgrades = [
    BreakInfinityUpgrade.totalAMMult,
    BreakInfinityUpgrade.currentAMMult,
    BreakInfinityUpgrade.galaxyBoost,
    BreakInfinityUpgrade.infinitiedMult,
    BreakInfinityUpgrade.achievementMult,
    BreakInfinityUpgrade.slowestChallengeMult,
    BreakInfinityUpgrade.infinitiedGen,
    BreakInfinityUpgrade.autobuyMaxDimboosts,
    BreakInfinityUpgrade.autobuyerSpeed
  ];

  for(const upgrade of upgrades){
    if(upgrade.isCharged){
      upgrade.disCharge();
    }
  }

  player.celestials.ra.breakDischarge = false;
  EventHub.dispatch(GAME_EVENT.BREAK_INFINITY_UPGRADES_DISCHARGED);
}

class RebuyableBreakInfinityUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.infinityPoints;
  }

  get boughtAmount() {
    return player.infinityRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.infinityRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }
}

export const BreakInfinityUpgrade = mapGameDataToObject(
  GameDatabase.infinity.breakUpgrades,
  config => (config.rebuyable
    ? new RebuyableBreakInfinityUpgradeState(config)
    : new BreakInfinityUpgradeState(config))
);
