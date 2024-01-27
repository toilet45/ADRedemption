<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import { corruptionPenalties } from "../../core/secret-formula/mending/corruption";

export default {
  name: "CorruptionFullEffectsModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  data() {
    return {
      corruptions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      corruptionInfos: corruptionPenalties,
    };
  },
  computed: {
    nerfs() {
      return [
        // Does this that hard? What on earth making you so arrogant that you could nerf player without telling them why? --sxy
        "Triad study 305, 311, 312, 313 are severely nerfed",
        "　",
        "Prestige Limits:",
        "All prestige currencies recieve an exponent",
        "　",//introducing fantasy chinese character
        "Dimensional Limits:",
        "All dimensions recieve an exponent",
        "　",
        "Time Compression:",
        "Game time recieves an exponent, then a divisor",
        `Begin from level 4, IP gain recieves an exponent: ^${format(this.corruptionInfos.timeCompression.hiddenFour[this.corruptions[2]], 3, 3)}`,
        `Begin from level 8, AD recieves an exponent: ^${format(this.corruptionInfos.timeCompression.hiddenEight[this.corruptions[2]], 3, 3)}`,
        "　",
        "Galactic Weakness:",
        "Galaxies scale faster and less effective",
        `Begin from level 3, Dimboosts recieve a hardcap: ${format(this.corruptionInfos.galWeak.hiddenThree[this.corruptions[3]], 3)}`,
        `Begin from level 6, Gamespeed recieves an exponent: ^${format(this.corruptionInfos.galWeak.hiddenSix[this.corruptions[3]], 3, 3)}`,
        `Begin from level 8, Infinity power conversion recieves a divisor: /${formatInt(this.corruptionInfos.galWeak.hiddenEight[this.corruptions[3]])}`,
        "　",
        "Complex Glyphs:",
        "Glyph level recieves a power effect",
        "Glyph rarity recieves a power effect",
        `Begin from level 4, some glyph slots will be forced Cursed glyphs, also forbidding you being Doomed: ${formatInt(this.corruptionInfos.compGlyphs.hiddenFour[this.corruptions[4]])} slots`,
        "Begin from level 7, Alchemy is disabled",
        "　",
        "Tick Extension:",
        "Tickspeed recieves an exponent",
        "Time shards are less efficient",
        "Begin from level 6, Triads cannot be purchased",
        "　",
        "Atom Dilution:",
        "AM gain exponent recieves an exponent",
        "　",
        "Theory of Dilation:",
        "DT and TP gain a power effect",
        "DT gains a divisor",
        `Begin from level 5, TT costs scale faster: ${formatX(this.corruptionInfos.toD.hiddenFive[this.corruptions[7]], 3, 3)}`,
        `Begin from level 8, Dimension cost scaling gains an exponent: ^${format(this.corruptionInfos.toD.hiddenEight[this.corruptions[7]], 3, 3)}`,
        "　",
        "Replicative Singularities:",
        "Replicanti gains a power exponent",
        "Singularity gains a power exponent",
        "DM gain gains a power exponent",
        `Prestige gain recieves an exponent: ^${format(this.corruptionInfos.repSing.presGain[this.corruptions[8]], 3, 3)}`,
        "Begin from level 5, rebuyable upgrades below Celestial level are disabled",
        "　",
        "Study of Forever:",
        "TT cost is more expensive",
        "TT generation from glyphs is disabled",
        "TD gain an exponent",
        "[Nerf discussing] Begin from level 4, Triad studies are disabled and some studies recieve heavy nerfs",
        "Begin from level 8, Charged upgrades are disabled and so are EC rewards",
      ];
    }
  },
  methods: {
    update() {
      this.corruptions = [...CorruptionData.corruptions];
    }  
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      List of full nerf effects of specific Hostilities
    </template>
    <div class="pelle-effects-container">
      <p
        v-for="(nerf, idx) in nerfs"
        :key="idx"
      >
        {{ nerf }}
      </p>
    </div>
    <PrimaryButton
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="emitClose"
    >
      Okay
    </PrimaryButton>
  </ModalWrapper>
</template>

<style scoped>
.pelle-effects-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
