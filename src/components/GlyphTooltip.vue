<script>
import GlyphTooltipEffect from "@/components/GlyphTooltipEffect";

export default {
  name: "GlyphTooltip",
  components: {
    GlyphTooltipEffect
  },
  props: {
    type: {
      type: String,
      required: true
    },
    strength: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    effects: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: false,
      default: 0,
    },
    sacrificeReward: {
      type: Number,
      required: false,
      default: 0,
    },
    refineReward: {
      type: Number,
      required: false,
      default: 0,
    },
    uncappedRefineReward: {
      type: Number,
      required: false,
      default: 0,
    },
    currentAction: {
      type: String,
      required: true
    },
    scoreMode: {
      type: Number,
      required: true
    },
    showDeletionText: {
      type: Boolean,
      required: false,
      default: true,
    },
    displayLevel: {
      type: Number,
      required: false,
      default: 0,
    },
    changeWatcher: {
      type: Number,
      required: true
    }
  },
  computed: {
    onTouchDevice() {
      return GameUI.touchDevice;
    },
    effectiveLevel() {
      return this.displayLevel ? this.displayLevel : this.level;
    },
    sortedEffects() {
      return getGlyphEffectValuesFromBitmask(this.effects, this.effectiveLevel, this.strength)
        .filter(effect =>
          GameDatabase.reality.glyphEffects[effect.id].isGenerated === generatedTypes.includes(this.type));
    },
    rarityInfo() {
      return getRarity(this.strength);
    },
    descriptionStyle() {
      let color = this.rarityInfo.color;
      if (this.type === "cursed") color = "black";
      if (this.type === "companion") color = GlyphTypes[this.type].color;
      return {
        color,
        "text-shadow": this.type === "cursed"
          ? undefined
          : `-0.1rem 0.1rem 0.1rem black, 0.1rem 0.1rem 0.1rem black,
            -0.1rem -0.1rem 0.1rem black, 0.1rem -0.1rem 0.1rem black,
            0 0 0.3rem ${color}`,
        animation: this.type === "reality" ? "a-reality-glyph-name-cycle 10s infinite" : undefined
      };
    },
    description() {
      const glyphName = `${this.type.capitalize()}`;
      switch (this.type) {
        case "companion":
          return "Companion Glyph";
        case "cursed":
          return "Cursed Glyph";
        case "reality":
          return `Pure Glyph of ${glyphName}`;
        default:
          return `${this.rarityInfo.name} Glyph of ${glyphName}`;
      }
    },
    isLevelCapped() {
      return this.displayLevel && this.displayLevel < this.level;
    },
    isLevelBoosted() {
      return this.displayLevel && this.displayLevel > this.level;
    },
    rarityText() {
      if (!GlyphTypes[this.type].hasRarity) return "";
      return `| Rarity:
        <span style="color: ${this.rarityInfo.color}">${formatRarity(strengthToRarity(this.strength))}</span>`;
    },
    levelText() {
      if (this.type === "companion") return "";
      // eslint-disable-next-line no-nested-ternary
      const arrow = this.isLevelCapped
        ? "<i class='fas fa-sort-down'></i>"
        : (this.isLevelBoosted ? "<i class='fas fa-sort-up'></i>" : "");
      // eslint-disable-next-line no-nested-ternary
      const color = this.isLevelCapped
        ? "#ff4444"
        : (this.isLevelBoosted ? "#44FF44" : "");
      return `Level: <span style="color: ${color}">
              ${arrow}${formatInt(this.effectiveLevel)}${arrow}
              </span>`;
    },
    eventHandlers() {
      return GameUI.touchDevice ? {
        touchstart: this.touchStart,
        dragstart: this.dragStart,
        dragEnd: this.dragEnd,
      } : {};
    },
    glyphTooltipStyle() {
      // With computer mice, it's nice to just totally disable mouse events on the tooltip,
      // which reduces the chances for stupidity
      return {
        "pointer-events": this.onTouchDevice ? undefined : "none",
        "border-color": GlyphTypes[this.type].color,
        "box-shadow": `0 0 0.5rem ${GlyphTypes[this.type].color}, 0 0 0.5rem ${GlyphTypes[this.type].color} inset`,
        animation: this.type === "reality" ? "a-reality-glyph-tooltip-cycle 10s infinite" : undefined,
        color: this.type === "cursed" ? "black" : undefined,
        background: this.type === "cursed" ? "white" : undefined
      };
    },
    glyphHeaderStyle() {
      const isCursed = this.type === "cursed";
      const isReality = this.type === "reality";

      let color = this.rarityInfo.color;
      if (isCursed) color = "black";
      if (this.type === "companion") color = GlyphTypes[this.type].color;
      return {
        "border-color": color,
        "box-shadow": `0 0 0.5rem 0.1rem ${color}, 0 0 0.8rem ${color} inset`,
        animation: isReality ? "a-reality-glyph-tooltip-header-cycle 10s infinite" : undefined,
        color: isCursed ? "black" : undefined,
        background: isCursed ? "white" : undefined
      };
    }
  },
  watch: {
    changeWatcher() {
      this.$recompute("sortedEffects");
    }
  },
  mounted() {
    // By attaching the tooltip to the body element, we make sure it ends up on top of anything
    // else, with no z order shenanigans
    document.body.appendChild(this.$el);
  },
  destroyed() {
    try {
      document.body.removeChild(this.$el);
    } catch (e) {
      // If the tooltip isn't visible, then it can't be removed on account of not being there in the first place.
      // Trying to remove it anyway causes an exception to be thrown but otherwise nothing seems to actually affect
      // the game. Nevertheless, including this try/catch no-op suppresses console error spam.
    }
  },
  methods: {
    touchStart() {
      // We _don't_ preventDefault here because we want the event to turn into a local
      // dragstart that we can intercept
      this.$parent.$emit("tooltip-touched");
    },
    dragStart(ev) {
      // Prevent dragging by tooltip on mobile
      ev.preventDefault();
      ev.stopPropagation();
    },
    dragEnd(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    },
    removeGlyph() {
      GlyphSacrificeHandler.removeGlyph(Glyphs.findById(this.id), false);
    },
    sacrificeText() {
      if (this.type === "companion" || this.type === "cursed") return "";
      const powerText = `${format(this.sacrificeReward, 2, 2)}`;
      const isCurrentAction = this.currentAction === "sacrifice";
      return `<span style="font-weight: ${isCurrentAction ? "bold" : ""}; color: ${isCurrentAction ? "#ccc" : ""}">
              Sacrifice: ${powerText}
              </span>`;
    },
    refineText() {
      if (this.type === "companion" || this.type === "cursed" || this.type === "reality") return "";
      if (!AlchemyResource[this.type].isUnlocked) return "";
      let refinementText = `${format(this.uncappedRefineReward, 2, 2)} ${GLYPH_SYMBOLS[this.type]}`;
      if (this.uncappedRefineReward !== this.refineReward) {
        refinementText += ` (Actual value due to cap: ${format(this.refineReward, 2, 2)} ${GLYPH_SYMBOLS[this.type]})`;
      }
      const isCurrentAction = this.currentAction === "refine";
      return `<span style="font-weight: ${isCurrentAction ? "bold" : ""}; color: ${isCurrentAction ? "#ccc" : ""}">
              Refine: ${refinementText}
              </span>`;
    },
    scoreText() {
      if (this.type === "companion" || this.type === "cursed" || this.type === "reality") return "";
      const showFilterScoreModes = [AUTO_GLYPH_SCORE.SPECIFIED_EFFECT, AUTO_GLYPH_SCORE.EFFECT_SCORE];
      if (!showFilterScoreModes.includes(this.scoreMode)) return "";
      return `Score: ${format(AutoGlyphProcessor.filterValue(this.$parent.glyph), 1, 1)}`;
    }
  }
};
</script>

<template>
  <div
    class="l-glyph-tooltip c-glyph-tooltip"
    :style="glyphTooltipStyle"
    v-on="eventHandlers"
  >
    <div
      class="c-glyph-tooltip__header"
      :style="glyphHeaderStyle"
    >
      <span
        class="c-glyph-tooltip__description"
        :style="descriptionStyle"
        v-html="description"
      />
      <span class="l-glyph-tooltip__info">
        <span v-html="levelText" />
        <span v-html="rarityText" />
      </span>
      <span v-if="showDeletionText">
        <span
          :class="['c-glyph-tooltip__sacrifice', {'c-glyph-tooltip__sacrifice--touchable': onTouchDevice}]"
          v-on="onTouchDevice ? { click: removeGlyph } : {}"
        >
          <span v-html="sacrificeText()" />
          <span v-if="sacrificeText() && refineText()"> | </span>
          <span v-html="refineText()" />
        </span>
      </span>
      <span class="c-glyph-tooltip__sacrifice">{{ scoreText() }}</span>
    </div>
    <div class="l-glyph-tooltip__effects">
      <GlyphTooltipEffect
        v-for="e in sortedEffects"
        :key="e.id + changeWatcher"
        :effect="e.id"
        :value="e.value"
      />
    </div>
  </div>
</template>