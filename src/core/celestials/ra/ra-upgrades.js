import { RebuyableMechanicState } from "../../game-mechanics";
import { SetPurchasableMechanicState } from "../../game-mechanics/set-purchasable";

class RaUpgradeState extends SetPurchasableMechanicState {
  get set() {
    return player.celestials.ra.upgrades;
  }

  get currency() {
    return this.config.currency();
  }

  get isAvailableForPurchase() {
    return this.config.implemented && player.celestials.ra.pets.ra.level >= 40;
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.RA_UPGRADE_BOUGHT);
  }
}

class RebuyableRaUpgradeState extends RebuyableMechanicState {
  get pet() {
    return this.config.celestial;
  }

  get isCapped() {
    return Ra.pets[this.pet].isCapped;
  }

  get currency() {
    return Currency.mendingPoints;
  }

  get boughtAmount() {
    return player.celestials.ra.rebuyables[this.id];
  }

  set boughtAmount(value) {
    player.celestials.ra.rebuyables[this.id] = value;
  }

  get isAvailableForPurchase() {
    return this.config.implemented && player.celestials.ra.pets.ra.level >= 40;
  }
}

export const RaUpgrade = mapGameDataToObject(
  GameDatabase.celestials.raUpgrades,
  config => (config.rebuyable
    ? new RebuyableRaUpgradeState(config)
    : new RaUpgradeState(config))
);

RaUpgrade.rebuyables = RaUpgrade.all.filter(u => u.isRebuyable);
RaUpgrade.singles = RaUpgrade.all.filter(u => !u.isRebuyable);