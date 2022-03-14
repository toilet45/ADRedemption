<script>
import GlyphComponent from "@/components/GlyphComponent";

export default {
  name: "EquippedGlyphs",
  components: {
    GlyphComponent
  },
  data() {
    return {
      isDoomed: false,
      glyphs: [],
      dragoverIndex: -1,
      respec: player.reality.respec,
      respecIntoProtected: player.options.respecIntoProtected,
      undoSlotsAvailable: 0,
      undoAvailable: false,
      undoVisible: false,
    };
  },
  computed: {
    // Empty slots are bigger due to the enlarged drop zone
    GLYPH_SIZE: () => 5,
    slotCount() {
      return this.glyphs.length;
    },
    arrangementRadius() {
      return [0, 0, 0, 4, 5, 6][this.slotCount];
    },
    respecTooltip() {
      const reset = Pelle.isDoomed ? "Armageddon" : "Reality";
      return this.respec
        ? `Respec is active and will place your currently - equipped Glyphs into your inventory after ${reset}.`
        : `Your currently-equipped Glyphs will stay equipped on ${reset}.`;
    },
    undoTooltip() {
      if (Pelle.isDoomed) return "Undo is not available while in Doomed";
      if (!this.undoSlotsAvailable) return "You do not have available inventory space to unequip Glyphs to";
      return this.undoAvailable
        ? ("Unequip the last equipped Glyph and rewind Reality to when you equipped it." +
          " (Most resources will be fully reset)")
        : "Undo is only available for Glyphs equipped during this Reality";
    },
    unequipText() {
      if (Pelle.isDoomed) return "Unequip Glyphs on Armageddon";
      return "Unequip Glyphs on Reality";
    }
  },
  created() {
    this.on$(GAME_EVENT.GLYPHS_EQUIPPED_CHANGED, this.glyphsChanged);
    this.glyphsChanged();
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.respec = player.reality.respec;
      this.respecIntoProtected = player.options.respecIntoProtected;
      this.undoSlotsAvailable = Glyphs.findFreeIndex(player.options.respecIntoProtected) !== -1;
      this.undoVisible = Teresa.has(TERESA_UNLOCKS.UNDO);
      // eslint-disable-next-line max-len
      this.undoAvailable = this.undoVisible &&
        this.undoSlotsAvailable &&
        player.reality.glyphs.undo.length > 0 &&
        !this.isDoomed;
    },
    glyphPositionStyle(idx) {
      return {
        position: "absolute",
        left: `calc(50% + ${this.glyphX(idx, 1)}rem)`,
        top: `calc(50% + ${this.glyphY(idx, 1)}rem)`,
        "z-index": 1,
      };
    },
    copyPositionStyle(glyph) {
      return {
        position: "absolute",
        left: `calc(50% + ${this.glyphX(glyph.idx, 1.4)}rem)`,
        top: `calc(50% + ${this.glyphY(glyph.idx, 1.4)}rem)`,
        opacity: 0.4,
      };
    },
    glyphX(idx, scale) {
      return -this.GLYPH_SIZE / 2 + this.arrangementRadius * scale *
        Math.sin(2 * Math.PI * idx / this.slotCount);
    },
    glyphY(idx, scale) {
      return -this.GLYPH_SIZE / 2 + this.arrangementRadius * scale *
        Math.cos(2 * Math.PI * idx / this.slotCount);
    },
    dragover(event, idx) {
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      event.preventDefault();
      this.dragoverIndex = idx;
    },
    dragleave(idx) {
      if (this.dragoverIndex === idx) this.dragoverIndex = -1;
    },
    drop(event, idx) {
      this.dragoverIndex = -1;
      const id = parseInt(event.dataTransfer.getData(GLYPH_MIME_TYPE), 10);
      if (isNaN(id)) return;
      const glyph = Glyphs.findById(id);
      if (glyph) Glyphs.equip(glyph, idx);
    },
    toggleRespec() {
      player.reality.respec = !player.reality.respec;
    },
    toggleRespecIntoProtected() {
      player.options.respecIntoProtected = !player.options.respecIntoProtected;
    },
    glyphsChanged() {
      this.glyphs = Glyphs.active.map(GlyphGenerator.copy);
    },
    undo() {
      if (!this.undoAvailable || Pelle.isDoomed) return;
      if (player.options.confirmations.glyphUndo) Modal.glyphUndo.show();
      else Glyphs.undo();
    },
    dragEvents(idx) {
      return {
        dragover: $event => this.dragover($event, idx),
        dragleave: () => this.dragleave(idx),
        drop: $event => this.drop($event, idx),
      };
    },
    showModal() {
      // If there aren't any glyphs equipped, the array is full of nulls which get filtered out by x => x
      if (this.glyphs.filter(x => x).length === 0) return;
      Modal.glyphShowcasePanel.show({
        name: "Equipped Glyphs",
        glyphSet: this.glyphs,
        closeOn: GAME_EVENT.GLYPHS_EQUIPPED_CHANGED,
        isGlyphSelection: false,
        showSetName: true,
        displaySacrifice: true,
      });
    },
    clickGlyph(glyph, idx) {
      if (glyph.symbol === "key266b") {
        // Random then round. If its 0, thats false, so increase by 1; otherwise its 1, which is true, so increase by 6
        const increase = Math.round(Math.random()) ? 6 : 1;
        const sound = idx + increase;
        new Audio(`audio/note${sound}.mp3`).play();
      }
    }
  }
};
</script>

<template>
  <div class="l-equipped-glyphs">
    <div class="l-equipped-glyphs__slots">
      <div
        v-for="(glyph, idx) in glyphs"
        :key="idx"
        class="l-glyph-set-preview"
        :style="glyphPositionStyle(idx)"
        v-on="dragEvents(idx)"
        @click="showModal"
      >
        <!-- the drop zone is a bit larger than the glyph itself. -->
        <div class="l-equipped-glyphs__dropzone" />
        <GlyphComponent
          v-if="glyph"
          :key="idx"
          :glyph="glyph"
          :circular="true"
          :is-active-glyph="true"
          style="-webkit-user-drag: none;"
          @clicked="clickGlyph(glyph, idx)"
        />
        <div
          v-else
          :class="['l-equipped-glyphs__empty', 'c-equipped-glyphs__empty',
                   {'c-equipped-glyphs__empty--dragover': dragoverIndex === idx}]"
        />
      </div>
    </div>
    <div class="l-equipped-glyphs__buttons">
      <button
        class="l-glyph-equip-button c-reality-upgrade-btn"
        :class="{'c-reality-upgrade-btn--bought': respec}"
        :ach-tooltip="respecTooltip"
        @click="toggleRespec"
      >
        {{ unequipText }}
      </button>
      <button
        v-if="undoVisible"
        class="l-glyph-equip-button c-reality-upgrade-btn"
        :class="{'c-reality-upgrade-btn--unavailable': !undoAvailable}"
        :ach-tooltip="undoTooltip"
        @click="undo"
      >
        <span v-if="!isDoomed">Rewind to <b>undo</b> the last equipped Glyph</span>
        <span v-if="isDoomed">You can't <b>undo</b> Armageddon</span>
      </button>
      <button
        class="l-glyph-equip-button c-reality-upgrade-btn"
        @click="toggleRespecIntoProtected"
      >
        Unequip Glyphs to:
        <br>
        <span v-if="respecIntoProtected">Protected slots</span>
        <span v-else>Main inventory</span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>