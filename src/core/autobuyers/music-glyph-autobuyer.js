import { AutobuyerState } from "./autobuyer";
import { GlyphSacrificeHandler, MendingMilestone } from "../globals";

export class MusicGlyphAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.musicglyph;
  }

  get name() {
    return `Auto Purchase and Purge Music Glyphs`;
  }

  get isUnlocked() {
    return MendingMilestone.seven.isReached;
  }

  get bulk() {
    return 0;
  }

  tick() {
  if (Currency.perkPoints.gt(0)) {
    GlyphSacrificeHandler.removeGlyph(GlyphGenerator.musicGlyph(), true)
    Currency.perkPoints.subtract(1)
    }
  }
}