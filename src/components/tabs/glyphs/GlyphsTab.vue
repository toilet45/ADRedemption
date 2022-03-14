<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import GlyphTabSidebar from "./sidebar/GlyphTabSidebar";
import GlyphPeek from "./GlyphPeek";
import RealityAmplifyButton from "./RealityAmplifyButton";
import GlyphInventory from "./GlyphInventory";
import SacrificedGlyphs from "./SacrificedGlyphs";
import CurrentGlyphEffects from "./CurrentGlyphEffects";
import EquippedGlyphs from "./EquippedGlyphs";
import GlyphLevelsAndWeights from "./GlyphLevelsAndWeights";
import ResetRealityButton from "./ResetRealityButton";
import RealityButton from "./RealityButton";
import RealityReminder from "./RealityReminder";

export default {
  name: "GlyphsTab",
  components: {
    ExpandingControlBox,
    GlyphTabSidebar,
    GlyphPeek,
    RealityAmplifyButton,
    GlyphInventory,
    SacrificedGlyphs,
    CurrentGlyphEffects,
    EquippedGlyphs,
    GlyphLevelsAndWeights,
    ResetRealityButton,
    RealityButton,
    RealityReminder
  },
  data() {
    return {
      enslavedHint: "",
      showInstability: false,
      instabilityThreshold: 0,
      hyperInstabilityThreshold: 0,
      isInCelestialReality: false,
      glyphTextColors: true,
      autoRestartCelestialRuns: false,
      sacrificeUnlocked: false,
      sacrificeDisplayed: false,
      resetRealityDisplayed: false,
    };
  },
  computed: {
    showEnslavedHint() {
      return this.enslavedHint !== "";
    },
    glyphColorState() {
      return {
        "o-glyph-color-checkbox": true,
        "o-glyph-color-checkbox--active": this.glyphTextColors,
        "o-glyph-color-checkbox--inactive": !this.glyphTextColors,
      };
    },
  },
  methods: {
    update() {
      this.resetRealityDisplayed = PlayerProgress.realityUnlocked();
      this.showInstability = player.records.bestReality.glyphLevel > 800;
      this.instabilityThreshold = Glyphs.instabilityThreshold;
      this.hyperInstabilityThreshold = Glyphs.hyperInstabilityThreshold;
      this.isInCelestialReality = isInCelestialReality();
      this.autoRestartCelestialRuns = player.options.retryCelestial;
      this.glyphTextColors = player.options.glyphTextColors;
      this.enslavedHint = "";
      this.sacrificeUnlocked = GlyphSacrificeHandler.canSacrifice;
      this.sacrificeDisplayed = player.reality.showGlyphSacrifice;
      if (!Enslaved.isRunning) return;
      const haveBoost = Glyphs.activeList.find(e => e.level < Enslaved.glyphLevelMin) !== undefined;
      if (haveBoost) {
        this.enslavedHint = "done... what little... I can... with Glyphs...";
      }
    },
    toggleAutoRestartCelestial() {
      player.options.retryCelestial = !player.options.retryCelestial;
    },
    toggleGlyphTextColors() {
      player.options.glyphTextColors = !player.options.glyphTextColors;
    },
    glyphInfoClass(isSacrificeOption) {
      if (this.sacrificeDisplayed === isSacrificeOption) return "c-glyph-info-button--active";
      return "";
    },
    setInfoState(state) {
      player.reality.showGlyphSacrifice = state;
    },
    glyphColorPosition() {
      return this.sacrificeUnlocked ? "l-glyph-color-position__low" : "l-glyph-color-position__top";
    }
  }
};
</script>

<template>
  <div>
    <div class="l-glyphs-tab">
      <div class="l-reality-button-column">
        <GlyphPeek />

        <div class="l-reality-button-group">
          <div class="l-reality-button-group-half">
            <ResetRealityButton v-if="resetRealityDisplayed" />

            <div v-if="isInCelestialReality">
              <input
                id="autoRestart"
                v-model="autoRestartCelestialRuns"
                type="checkbox"
                :value="autoRestartCelestialRuns"
                @input="toggleAutoRestartCelestial()"
              >
              <label for="autoRestart">Repeat this Celestial's Reality</label>
            </div>
            <RealityAmplifyButton v-else />
          </div>
          <RealityButton />
        </div>

        <RealityReminder />

        <div v-if="showInstability">
          <br>
          Glyphs are becoming unstable.
          <br>
          Glyph levels higher than {{ formatInt(instabilityThreshold) }} are harder to reach.
          <br>
          This effect is even stronger above level {{ formatInt(hyperInstabilityThreshold) }}.
        </div>
        <ExpandingControlBox
          width-source="content"
          label="Glyph Level Factors"
          container-class="c-glyph-level-factors-dropdown-header"
          style="margin: 2rem;"
        >
          <GlyphLevelsAndWeights slot="dropdown" />
        </ExpandingControlBox>
        <GlyphTabSidebar />
      </div>
      <div class="l-player-glyphs-column">
        <div
          v-if="showEnslavedHint"
          class="o-teresa-quotes"
          v-html="enslavedHint"
        />
        <div class="l-equipped-glyphs-and-effects-container">
          <EquippedGlyphs />
          <div class="l-glyph-info-wrapper">
            <span
              class="l-glyph-color-box"
              @click="toggleGlyphTextColors"
            >
              <div :class="glyphColorPosition()">
                <label
                  :class="glyphColorState"
                >
                  <span class="fas fa-palette" />
                </label>
              </div>
            </span>
            <div
              v-if="sacrificeUnlocked"
              class="c-glyph-info-options"
            >
              <div
                class="c-glyph-info-button"
                :class="glyphInfoClass(false)"
                style="border-right: 0.1rem solid #b8b8b8;"
                @click="setInfoState(false)"
              >
                Current Glyph effects
              </div>
              <div
                class="c-glyph-info-button"
                :class="glyphInfoClass(true)"
                @click="setInfoState(true)"
              >
                Glyph Sacrifice totals
              </div>
            </div>
            <SacrificedGlyphs v-if="sacrificeUnlocked && sacrificeDisplayed" />
            <CurrentGlyphEffects v-else />
          </div>
        </div>
        <GlyphInventory />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>