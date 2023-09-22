
import { IntervaledAutobuyerState } from "./autobuyer";
import { MendingMilestone } from "../mending";

export class DilationUpgradeAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() { return ["dtGain", "galaxyThreshold", "tachyonGain", "dtGainPelle", "galaxyMultiplier", "tickspeedPower"][this.id - 1]; }

  get data() {
    return player.auto.dilationUpgrades.all[this.id - 1];
  }

  get name() {
    return [`Dilated Time Multiplier`, `Tachyon Galaxy Threshold`, "Tachyon Particle Multiplier", "Pelle DT Multiplier", "Pelle TG Multiplier", "Tickspeed Power"][this.id - 1];
  }

  get interval() {
    return 1000 * Perk.autobuyerFasterDilation.effectOrDefault(1) / PerkShopUpgrade.autoSpeed.effectOrDefault(1);
  }

  get isUnlocked() {
    const upgradeName = this._upgradeName;
    if (upgradeName == "dtGainPelle" || upgradeName == "galaxyMultiplier" || upgradeName == "tickspeedPower"){
      return MendingMilestone.two.isReached
    }
    return (Perk.autobuyerDilation.isEffectActive && !Pelle.isDoomed) || (MendingMilestone.one.isReached);
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.REALITY;
  }

  get bulk() {
    if (MendingMilestone.two.isReached) return 100000; //lazy man's fix until a better solution is implemented
    return PerkShopUpgrade.bulkDilation.effectOrDefault(1);
  }

  tick() {
    super.tick();
    const upgradeName = this._upgradeName;
    DilationUpgrade[upgradeName].purchase(this.bulk);
  }

  static get entryCount() { 
    return 6
  }
  static get autobuyerGroupName() { return "Dilation Upgrade"; }
  static get isActive() { return player.auto.dilationUpgrades.isActive; }
  static set isActive(value) { player.auto.dilationUpgrades.isActive = value; }
}
