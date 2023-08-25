import { PlayerProgress } from "../player-progress";
import { AutobuyerState } from "./autobuyer";
import { MendingUpgrade } from "../mending-upgrades";
import { Tesseracts } from "../celestials/enslaved";
export class TesseractAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.tesseract;
  }

  get name() {
    return `Tesseract`;
  }

  get isUnlocked() {
    return MendingUpgrade(7).isBought;
  }

  get isEnabled() {
    return true
  }

  get bulk() {
    return 0;
  }
  tick() {
    Tesseracts.buyTesseract()
}

}