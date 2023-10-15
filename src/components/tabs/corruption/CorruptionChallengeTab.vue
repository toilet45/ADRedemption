<script>
import { DC } from "@/core/constants";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "CorruptionTab",
  components: {
    CelestialQuoteHistory,
    CustomizeableTooltip,
    SliderComponent,
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      percentage: "",
      possibleFillPercentage: "",
      bestAM: new Decimal(0),
      corruptionSet: [],
      lastMachines: new Decimal(0),
      perkPoints: 0,
      hasReality: false,
      hasEPGen: false,
      hasPerkShop: false,
      raisedPerkShop: false,
      isRunning: false,
      canUnlockNextPour: false,
      corruptions: CorruptionData.corruptions.mapToObject(e => e, () => 0),
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
        "c-teresa-run-button__icon": true,
        "c-teresa-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    pourButtonClassObject() {
      return {
        "o-teresa-shop-button": true,
        "c-teresa-pour": true,
        "o-teresa-shop-button--available": !this.isPouredAmountCapped,
        "o-teresa-shop-button--capped": this.isPouredAmountCapped,
        "c-teresa-pour--unlock-available": this.canUnlockNextPour,
        "c-disabled-pour": this.isPouredAmountCapped
      };
    },
    runDescription() {
      return GameDatabase.challenges.corruption.desc()
    },
    unlockInfoTooltipArrowStyle() {
      return {
        borderRight: "0.5rem solid var(--color-teresa--base)"
      };
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      const now = new Date().getTime();
      this.time = now;
      this.percentage = `${(Teresa.fill * 100).toFixed(2)}%`;
      this.possibleFillPercentage = `${(Teresa.possibleFill * 100).toFixed(2)}%`;
      this.recordScore = CorruptionData.corruptionChallenge.recordScore;
      this.corruptionSet = CorruptionData.corruptionChallenge.recordCorruptions;
      this.corruptions = CorruptionData.corruptions;
      this.perkPoints = Currency.perkPoints.value;
      this.isRunning = Teresa.isRunning;
    },
    startRun() {
      this.nextCorrupted = !this.nextCorrupted
    },
    corruptionSetSet(id, value) {
      this.corruptions[id] = value;
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-teresa-unlock-description": true,
        "c-teresa-unlock-description--unlocked": this.hasUnlock(unlockInfo)
      };
    }
  }
};
</script>

<template>
  <div class="l-teresa-celestial-tab">
    <div class="l-mechanics-container">
      <div
        class="l-teresa-mechanic-container"
      >
        <div class="c-teresa-unlock c-teresa-run-button">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
              Corrupt Next Mend
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
          @input="corruptionSetSet(0, $event)"
        />
        <br>
    Dimensional Limitations:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[1]"
          :width="'100%'"
          @input="corruptionSetSet(1, $event)"
        />
        <br>
    Time Compression:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[2]"
          :width="'100%'"
          @input="corruptionSetSet(2, $event)"
        />
        <br>
    Galactic Weakness:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[3]"
          :width="'100%'"
          @input="corruptionSetSet(3, $event)"
        />
        <br>
    Complex Glyphs:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[4]"
          :width="'100%'"
          @input="corruptionSetSet(4, $event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-disabled-pour {
  opacity: 0.8;
  pointer-events: none;
}
</style>
