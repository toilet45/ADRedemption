<script>
import { DC } from "@/core/constants";
import { corruptionPenalties } from "../../../core/secret-formula/mending/corruption";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import SliderComponent from "@/components/SliderComponent";
import { playerInfinityUpgradesOnReset } from "../../../game";

export default {
  name: "CorruptionTab",
  components: {
    CelestialQuoteHistory,
    CustomizeableTooltip,
    SliderComponent,
  },
  data() {
    return {
      time: new Date().getTime(),
      bestAM: new Decimal(0),
      recordScore: 0,
      corruptionSet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      corruptions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      localPenalties: corruptionPenalties,
      perkPoints: 0,
      hasReality: false,
      isRunning: false,
      dimLimNerf: false,
      nextCorrupted: false,
      timeCompMult: new Decimal(0),
    };
  },
  computed: {
    corruptionSliderProps() {
      return {
        min: 0,
        max: 9,
        width: "18rem",
        valueInDot: true,
        tooltip: "never",
        "dot-width": "2.2rem",
        "dot-height": "1.6rem",
        "dot-class": "c-glyph-sacrifice-options__rarity-slider-handle",
        "bg-class": "c-glyph-sacrifice-options__rarity-slider-bg",
        "process-class": "c-glyph-sacrifice-options__rarity-slider-process",
        style: {
          "margin-left": "1rem",
        }
      };
    },
    runButtonClassObject() {
      return {
        "c-corrupt-run-button__icon": true,
        "c-corrupt-run-button__icon--running": this.isRunning,
        "c-corrupt-run-button--clickable": true,
        "o-pelle-disabled-pointer": false
      };
    },
    runDescription() {
      return GameDatabase.challenges.corruption.desc()
    },
    unlockInfoTooltipArrowStyle() {
      return {
        borderRight: "0.5rem solid var(--color-pelle--base)"
      };
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      const now = new Date().getTime();
      this.time = now;;
      this.recordScore = CorruptionData.corruptionChallenge.recordScore;
      this.corruptionSet = [...CorruptionData.corruptionChallenge.recordCorruptions];
      this.corruptions = [...CorruptionData.corruptions];
      this.isRunning = CorruptionData.isCorrupted;
      this.dimLimNerf = Ra.unlocks.DimLimitCorruptionImprovementPelle.isUnlocked
      // This was being annoying so this is a cheap fix that works
      this.timeCompMult = format(new Decimal(1).div(this.localPenalties.timeCompression.mult[this.corruptions[2]]))
    },
    startRun() {
      if (!this.isRunning) {
        this.nextCorrupted = !this.nextCorrupted
        player.mending.corruptNext = this.nextCorrupted
      }
      else {
        player.mending.corruptionChallenge.corruptedMend = false
      }
    },
    corruptionSetSet(id, value) {
      this.corruptions[id] = value;
      player.mending.corruption[id] = value
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-corrupt-unlock-description": true,
        "c-corrupt-unlock-description--unlocked": this.hasUnlock(unlockInfo)
      };
    }
  }
};
</script>

<template>
  <div class="l-corrupt-celestial-tab">
    You have <span class="c-fragments-amount__accent">{{ format(0, 2) }}</span> Corrupted Fragments.
    <br>
    <div class="l-mechanics-container">
      <div
        class="l-corrupt-mechanic-container"
      >
        <div class="c-corrupt-unlock c-corrupt-run-button">
          <span v-if="!isRunning && !nextCorrupted">
              Corrupt Next Mend
          </span>
          <span v-else-if="!isRunning">
              Dont corrupt Next Mend
          </span>
          <span v-else>
              Exit Corrupted Mend
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun()"
          >
            ?
          </div>
          {{ runDescription }}
          <br><br>
          <div>
            <span v-if="recordScore > 0">
              Your record score is {{ format(recordScore, 2) }},
              achieved with {{corruptionSet[0]}}/{{corruptionSet[1]}}/{{corruptionSet[2]}}/{{corruptionSet[3]}}/{{corruptionSet[4]}}/{{corruptionSet[5]}}/{{corruptionSet[6]}}/{{corruptionSet[7]}}/{{corruptionSet[8]}}/{{corruptionSet[9]}}
            </span>
            <span v-else>
              You have not mended in a
              corrupted multiverse yet.
            </span>
          </div>
        </div>
    Prestige Limits:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[0]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(0, $event)"
        />
        IP, EP, and RM gain by ^{{localPenalties.prestigeLimits[this.corruptions[0]]}}.
        <br>
        <br>
    Dimensional Limitations:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[1]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(1, $event)"
        />
        AD, ID, and TD multipliers {{formatX(dimLimNerf ? localPenalties.dimLimits.postNerf[[this.corruptions[1]]] : localPenalties.dimLimits.preNerf[[this.corruptions[1]]], 2, 3)}}
        <br>
        <br>
    Time Compression:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[2]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(2, $event)"
        />
        Gamespeed ^{{localPenalties.timeCompression.power[this.corruptions[2]]}} and then /{{timeCompMult}}
        <br>
        <br>
    Galactic Weakness:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[3]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(3, $event)"
        />
        Galaxy Scaling ^{{localPenalties.galWeak.scaling[this.corruptions[3]]}} and power {{formatX(localPenalties.galWeak.strength[this.corruptions[3]], 1, 2)}}
        <br>
        <br>
    Complex Glyphs:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[4]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(4, $event)"
        />
        Glyph Level ^{{localPenalties.compGlyphs.level[this.corruptions[4]]}} and then {{ formatX(localPenalties.compGlyphs.level[this.corruptions[4]], 1, 2) }}. <br>
        Glyph Rarity ^{{localPenalties.compGlyphs.rarity[this.corruptions[4]]}} and then {{ formatX(localPenalties.compGlyphs.rarity[this.corruptions[4]], 1, 2) }}.
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-fragments-amount__accent {
  font-size: 2rem;
  color: var(--color-pelle--base);
}
</style>
