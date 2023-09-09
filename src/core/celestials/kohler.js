import { BitUpgradeState, RebuyableMechanicState } from "../game-mechanics";
import { GameDatabase } from "../secret-formula/game-database";

import { Quotes } from "./quotes";

export const Kohler = {
  get displayName(){
    return false ? "Kohler" : "???"
  },
  get possessiveName(){
    return false ? "Kohler's" : "???'s"
  },
  get isUnlocked() {
    return false;
  },
  quotes: Quotes.kohler,
  get symbol(){ 
    return false ? "<i class='fa-solid fa-staff-snake'></i>" : "?"
  }
};
