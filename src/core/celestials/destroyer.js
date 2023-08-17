import { BitUpgradeState, RebuyableMechanicState } from "../game-mechanics";
import { GameDatabase } from "../secret-formula/game-database";

import { Quotes } from "./quotes";

export const Destroyer = {
  displayName: "The Destroyer",
  possessiveName: "The Destroyer's",
  get isUnlocked() {
    return true;
  },
  quotes: Quotes.destroyer,
  symbol: " "
};
