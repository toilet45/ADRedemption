<script>
import { DC } from "@/core/constants";
import { corruptionPenalties } from "../../../core/secret-formula/mending/corruption";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import SliderComponent from "@/components/SliderComponent";
import { playerInfinityUpgradesOnReset } from "../../../game";
import CorruptionUpgradeButton from "./CorruptionUpgradeButton.vue";
import { WarpUpgrade } from "../../../core/warp-upgrades";
import { mendingReset } from "../../../core/globals";

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
      corruptedFrags: 0,
    };
  },
  computed: {
    corruptionSliderProps() {
      return {
        min: 0,
        max: 9+(WarpUpgrade(6).isBought + WarpUpgrade(12).isBought),
        width: "27rem",
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
    bonusInfo() {
      return GameDatabase.challenges.corruption.incBonusText()
    },
    rewardInfo() {
      return GameDatabase.challenges.corruption.reward()
    },
    unlockInfoTooltipArrowStyle() {
      return {
        borderRight: "0.5rem solid var(--color-pelle--base)"
      };
    },
    isDoomed: () => Pelle.isDoomed,
    upgrades: () => CorruptionUpgrades.all,
    costScalingTooltip: () => `Prices start increasing faster above ${format(1e30)} HF and then even faster
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
      this.corruptedFrags = player.mending.corruptedFragments
    },
    startRun() {
      if (!this.isRunning) {
        this.nextCorrupted = !this.nextCorrupted
        player.mending.corruptNext = this.nextCorrupted
      }
      else {
        player.mending.corruptionChallenge.corruptedMend = false
        /*this.isRunning*/CorruptionData.isCorrupted = false
        this.isRunning = false;
        this.nextCorrupted = false
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
    },
    showModal() {
      Modal.corruptionFullEffects.show();
    },   
  }
};
</script>

<template>
  <div class="l-corrupt-celestial-tab">
    <div text-left> 
    You have <span class="c-fragments-amount__accent">{{ formatInt(corruptedFrags, 2) }}</span> Hostile Fragments.
    </div>
    <br>
    <div class="l-mechanics-container">
      <div
        class="l-corrupt-mechanic-container"
      >
        <div class="c-corrupt-unlock c-corrupt-run-button">
          <span v-if="!isRunning && !nextCorrupted">
              Make Next Mend Hostile
          </span>
          <span v-else-if="!isRunning">
              Next Mend will be Hostile, Mend to apply Hostilities
          </span>
          <span v-else>
              Exit Hostile Mend
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun();update()"
          >
          <i class="fa-solid fa-biohazard"></i>
          </div>
          {{ runDescription }}
          <br><br>
          {{  bonusInfo }}
          <br><br>
          {{  rewardInfo }}
          <br><br>
          <div>
            <span v-if="recordScore > 0">
              Your record score is {{ format(recordScore, 2) }},
              achieved with {{corruptionSet[0]}}/{{corruptionSet[1]}}/{{corruptionSet[2]}}/{{corruptionSet[3]}}/{{corruptionSet[4]}}/{{corruptionSet[5]}}/{{corruptionSet[6]}}/{{corruptionSet[7]}}/{{corruptionSet[8]}}/{{corruptionSet[9]}}
            </span>
            <span v-else>
              You have not mended in a
              hostile multiverse yet.
            </span>
          </div>
        </div>
      </div>
    <div>
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
        AD, ID, and TD multipliers ^{{format(dimLimNerf ? localPenalties.dimLimits.postNerf[[this.corruptions[1]]] : localPenalties.dimLimits.preNerf[[this.corruptions[1]]], 2, 3)}}
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
        <br>
        <br>
    Tick Extension:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[5]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(5, $event)"
        />
        Tickspeed ^{{formatInt(1)}}/{{format(localPenalties.tickExtension[this.corruptions[5]], 2, 1)}}. <br>
        Time Shard Gain /{{format(localPenalties.tickExtension[this.corruptions[5]], 2, 1)}}.
        <br>
        <br>
    Atomic Dilution:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[6]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(6, $event)"
        />
        Antimatter exponent ^{{format(localPenalties.atomDilution[this.corruptions[6]], 3, 3)}}.
        <br>
        <br>
    Theory of Dilation:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[7]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(7, $event)"
        />
        DT and TP gain ^{{format(localPenalties.toD.power[this.corruptions[7]], 3, 3)}}. <br>
        DT gain ×{{localPenalties.toD.mult[this.corruptions[7]].toString()}}.
        <br>
        <br>
    Replicative Singularities:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[8]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(8, $event)"
        />
        Replicanti gain ^{{localPenalties.repSing.rep[this.corruptions[8]].toString()}}. <br>
        Sigularity gain ^{{localPenalties.repSing.sing[this.corruptions[8]].toString()}}. <br>
        Dark Matter gain ^{{localPenalties.repSing.dm[this.corruptions[8]].toString()}}.
        <br>
        <br>
    Study of Forever:
    <SliderComponent
          v-bind="corruptionSliderProps"
          :value="corruptions[9]"
          :width="'100%'"
          :disabled="isRunning"
          @input="corruptionSetSet(9, $event)"
        />
        Studies TT cost ×{{format(localPenalties.soF.ttcost[this.corruptions[9]], 0, 0)}}. <br>
        TD mult ^{{localPenalties.soF.tdpow[this.corruptions[9]].toString()}}.
      </div>
    </div>
    <div class="button-container">
      <button
        class="o-pelle-button"
        @click="showModal"
      >
        Show full nerf effects of specific Hostilities
      </button>
      <br>
      Last two row of Hostile Upgrades are only effective in Hostile Mends, and they won't affect the number display at this page. (sry)
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

.o-pelle-button {
  font-family: Typewriter;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
  margin-bottom: 1rem;
  padding: 1rem;
  transition-duration: 0.12s;
  cursor: pointer;
}

.o-pelle-button:hover {
  box-shadow: 0.1rem 0.1rem 0.3rem var(--color-pelle--base);
}
</style>
