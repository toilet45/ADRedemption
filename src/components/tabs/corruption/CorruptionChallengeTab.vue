<script>
import { DC } from "@/core/constants";
import { corruptionPenalties } from "../../../core/secret-formula/mending/corruption";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import SliderComponent from "@/components/SliderComponent";
import { playerInfinityUpgradesOnReset } from "../../../game";
import CorruptionUpgradeButton from "./CorruptionUpgradeButton.vue";

export default {
  name: "CorruptionTab",
  components: {
    CelestialQuoteHistory,
    CustomizeableTooltip,
    SliderComponent,
    CorruptionUpgradeButton
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
    upgrades: () => CorruptionUpgrades.all,
    costScalingTooltip: () => `Prices start increasing faster above ${format(1e30)} RM and then even faster
      above ${format(Decimal.NUMBER_MAX_VALUE, 1)} RM`,
    possibleTooltip: () => `Striped upgrades are Not Yet Implemented [NYI].`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
    grid: () => [],
    tooltip() {
      return undefined
    },
    totalUpgFunc() {
     return CorruptionUpgrades.all.countWhere(u => u.isBought);
    },
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
    },
    id(row, column) {
      return (row - 1) * 5 + column - 1;
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
    <div class="c-mending-upgrade-infotext">
      Mouseover <i class="fas fa-question-circle" /> icons for additional information.
      <br>
      The first row of upgrades can be purchased endlessly for increasing costs
      <span :ach-tooltip="costScalingTooltip">
        <i class="fas fa-question-circle" />
      </span>
      and the rest are single-purchase.
      <br>
      Striped Upgrades (or ones that cost 1e300 CF) are not yet implemented
      <br>
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-mending-upgrade-grid__row"
    >
      <CorruptionUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-fragments-amount__accent {
  font-size: 2rem;
  color: var(--color-pelle--base);
}
</style>
