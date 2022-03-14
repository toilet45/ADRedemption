<script>
export default {
  name: "SelectedEffectToggle",
  props: {
    effect: {
      type: Object,
      required: true
    },
    glyphType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: AutoGlyphProcessor.types[this.glyphType].effectChoices[this.effect.id],
      isExcluded: false,
    };
  },
  computed: {
    description() {
      return typeof this.effect.genericDesc === "function"
        ? this.effect.genericDesc()
        : this.effect.genericDesc;
    },
    classObject() {
      return this.isActive ? "c-auto-sac-type-tab__effect-desc--active" : "c-auto-sac-type-tab__effect-desc--inactive";
    },
  },
  methods: {
    update() {
      this.isExcluded = this.exclusionTooltip() !== "";
    },
    toggleSelection() {
      this.isActive = !AutoGlyphProcessor.types[this.glyphType].effectChoices[this.effect.id];
      AutoGlyphProcessor.types[this.glyphType].effectChoices[this.effect.id] = this.isActive;
    },
    setEffectCount(event) {
      const inputValue = event.target.value;
      if (!isNaN(inputValue)) {
        this.autoSacrificeSettings.effectCount = Math.clamp(inputValue, 0, 8);
      }
    },
    // This is hardcoded here since there is only one case ever, and that adding generic dynamic support to multiple
    // pairs/groups of effects is both out of design scope and an unacceptable performance hit to amplified realities
    exclusionTooltip() {
      if (Ra.has(RA_UNLOCKS.GLYPH_EFFECT_COUNT)) return "";

      const effarigSettings = AutoGlyphProcessor.types.effarig.effectChoices;
      if (effarigSettings.effarigrm && effarigSettings.effarigglyph &&
        (this.effect.id === "effarigrm" || this.effect.id === "effarigglyph")) {
        return "RM multiplier and Glyph instability cannot occur together on the same Glyph!";
      }
      if (this.effect.id === "effarigrm" && effarigSettings.effarigglyph) {
        return "This effect is mutually exclusive with Glyph instability!";
      }
      if (this.effect.id === "effarigglyph" && effarigSettings.effarigrm) {
        return "This effect is mutually exclusive with RM multiplier!";
      }
      return "";
    },
  }
};
</script>

<template>
  <div
    :class="classObject"
    @click="toggleSelection()"
  >
    <span
      v-if="isExcluded"
      v-tooltip="exclusionTooltip()"
    >
      <del>{{ description }}</del>
    </span>
    <span v-else>
      {{ description }}
    </span>
  </div>
</template>

<style scoped>

</style>