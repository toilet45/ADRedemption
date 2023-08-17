import { PlayerProgress } from "../player-progress";
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
      if (Pelle.isDoomed) return false;
      return true;
    }
    return (Perk.autobuyerDilation.isEffectActive && !Pelle.isDoomed) || PlayerProgress.mendingUnlocked();
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.REALITY;
  }

  get bulk() {
    return PerkShopUpgrade.bulkDilation.effectOrDefault(1);
  }

  tick() {
    super.tick();
    const upgradeName = this._upgradeName;
    DilationUpgrade[upgradeName].purchase(this.bulk);
  }

  static get entryCount() { 
    if (MendingMilestone.two.isReached){
      return 6;
    }
    return 3; 
  }
  static get autobuyerGroupName() { return "Dilation Upgrade"; }
  static get isActive() { return player.auto.dilationUpgrades.isActive; }
  static set isActive(value) { player.auto.dilationUpgrades.isActive = value; }
}
