<!-- eslint-disable no-negated-condition -->
<script>
import { corruptionPenalties } from "../../../core/secret-formula/mending/corruption";

import { playerInfinityUpgradesOnReset } from "../../../game";

import { WarpUpgrade } from "../../../core/warp-upgrades";

import { CorruptionData, mendingReset } from "../../../core/globals";

import PrimaryButton from "../../PrimaryButton.vue";

import { DC } from "@/core/constants";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import SliderComponent from "@/components/SliderComponent";


import CorruptionUpgradeButton from "./CorruptionUpgradeButton.vue";


export default {
  name: "CorruptionTab",
  components: {
    CelestialQuoteHistory,
    CustomizeableTooltip,
    SliderComponent,
    CorruptionUpgradeButton,
    PrimaryButton
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
      rewardedFragments: 0,
      respec: false,
      externCorrupt: false,
      showC3nerf1: false,
      showC3nerf2: false,
      showC4nerf1: false,
      showC4nerf2: false,
      showC4nerf3: false,
      showC5nerf1: false,
      showC5nerf2: false,
      showC6nerf: false,
      showC8nerf1: false,
      showC8nerf2: false,
      showC9nerf: false,
      showC10nerf1: false,
      showC10nerf2: false
    };
  },
  computed: {
    corruptionSliderProps() {
      return {
        min: 0,
        max: 9 + (WarpUpgrade(6).isBought), // + WarpUpgrade(12).isBought),
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
        "c-corrupt-run-button__icon--running": this.isRunning && !this.externCorrupt,
        "c-corrupt-run-button--clickable": !this.externCorrupt,
        "o-pelle-disabled-pointer": this.externCorrupt
      };
    },
    respecClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--respec-active": this.respec
      };
    },
    runDescription() {
      return GameDatabase.challenges.corruption.desc(this.corruptionsZeroCheck());
    },
    bonusInfo() {
      return GameDatabase.challenges.corruption.incBonusText();
    },
    rewardInfo() {
      return GameDatabase.challenges.corruption.reward(this.rewardedFragments);
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
      return undefined;
    },
    totalUpgFunc() {
      return CorruptionUpgrades.all.countWhere(u => u.isBought);
    },
  },
  watch: {
    respec(newValue) {
      player.mending.cuRespec = newValue;
    },
  },
  methods: {
    update() {
      const now = new Date().getTime();
      this.time = now;
      this.recordScore = CorruptionData.corruptionChallenge.recordScore;
      this.corruptionSet = [...CorruptionData.corruptionChallenge.recordCorruptions];
      this.corruptions = [...CorruptionData.corruptions];
      this.isRunning = CorruptionData.isCorrupted || this.externCorrupt;
      this.dimLimNerf = Ra.unlocks.DimLimitCorruptionImprovementPelle.isUnlocked;
      this.nextCorrupted = player.mending.corruptNext;
      // This was being annoying so this is a cheap fix that works
      this.timeCompMult = format(this.localPenalties.timeCompression.mult[this.corruptions[2]]);
      this.corruptedFrags = player.mending.corruptedFragments;
      this.rewardedFragments = Math.ceil(Math.log2(CorruptionData.calcScore()));
      this.respec = player.mending.cuRespec;
      this.externCorrupt = Kohler.isRunning;
      this.showC3nerf1 = this.corruptions[2] > 3;
      this.showC3nerf2 = this.corruptions[2] > 7;
      this.showC4nerf1 = this.corruptions[3] > 2;
      this.showC4nerf2 = this.corruptions[3] > 5;
      this.showC4nerf3 = this.corruptions[3] > 7;
      this.showC5nerf1 = this.corruptions[4] > 3;
      this.showC5nerf2 = this.corruptions[4] > 6;
      this.showC6nerf = this.corruptions[5] > 5;
      this.showC8nerf1 = this.corruptions[7] > 4;
      this.showC8nerf2 = this.corruptions[7] > 7;
      this.showC9nerf = this.corruptions[8] > 3;
      this.showC10nerf1 = this.corruptions[9] > 3;
      this.showC10nerf2 = this.corruptions[9] > 7;
    },
    corruptionsZeroCheck() {
      for (let i = 0; i < 10; i++) {
        if (this.corruptions[i] !== 0) return false;
      }
      return true;
    },
    startRun() {
      CorruptionData.update();
      if (!this.isRunning) {
        if (!this.corruptionsZeroCheck()) {
          player.mending.corruptNext = !player.mending.corruptNext;
        // Player.mending.corruptNext = this.nextCorrupted
        } else {
          player.mending.corruptNext = false;
          this.nextCorrupted = false;
        }
      } else {
        player.mending.corruptionChallenge.corruptedMend = false;
        CorruptionData.isCorrupted = false;
        this.isRunning = false;
        this.nextCorrupted = false;
      }
    },
    corruptionSetSet(id, value) {
      this.corruptions[id] = value;
      player.mending.corruption[id] = value;
      CorruptionData.update();
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
          <span v-if="externCorrupt">
            Hostilities cannot be adjusted due to external factors
          </span>
          <span v-else-if="!isRunning && !nextCorrupted && !corruptionsZeroCheck()">
            Make Next Mend Hostile
          </span>
          <span v-else-if="(!isRunning && !nextCorrupted && corruptionsZeroCheck())">
            Set at least one Hostility to at least Level 1 to make next Mend Hostile
          </span>
          <span v-else-if="!isRunning && !corruptionsZeroCheck()">
            Next Mend will be Hostile, Mend to apply Hostilities
          </span>
          <span v-else-if="!isRunning && corruptionsZeroCheck()">
            Next Mend will not be hostile unless you select one Hostility to atleast level 1
          </span>
          <span v-else>
            Exit Hostile Mend
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun();update()"
          >
            <i class="fa-solid fa-biohazard" />
          </div>
          {{ runDescription }}
          <br><br>
          {{ bonusInfo }}
          <br><br>
          {{ rewardInfo }}
          <br><br>
          <div>
            <span v-if="recordScore > 0">
              Your record score is {{ format(recordScore, 2) }},
              achieved with {{ corruptionSet[0] }}/{{ corruptionSet[1] }}/{{ corruptionSet[2] }}/{{ corruptionSet[3] }}/{{ corruptionSet[4] }}/{{ corruptionSet[5] }}/{{ corruptionSet[6] }}/{{ corruptionSet[7] }}/{{ corruptionSet[8] }}/{{ corruptionSet[9] }}
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
        IP, EP, and RM gain by ^{{ localPenalties.prestigeLimits[corruptions[0]] }}.
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
        AD, ID, and TD multipliers ^{{ format(dimLimNerf ? localPenalties.dimLimits.postNerf[[corruptions[1]]] : localPenalties.dimLimits.preNerf[[corruptions[1]]], 2, 3) }}
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
        Gamespeed ^{{ localPenalties.timeCompression.power[corruptions[2]] }} and then /{{ timeCompMult }}
        <br>
        <span v-if="showC3nerf1">Infinity Point gain ^{{localPenalties.timeCompression.hiddenFour[this.corruptions[2]]}}</span>
        <br>
        <span v-if="showC3nerf2">Antimatter Dimension multiplier ^{{localPenalties.timeCompression.hiddenEight[this.corruptions[2]]  }}</span>
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
        Galaxy Scaling ^{{ localPenalties.galWeak.scaling[corruptions[3]] }} and power {{ formatX(localPenalties.galWeak.strength[corruptions[3]], 1, 2) }}
        <br>
        <span v-if="showC4nerf1">You are limited to {{ localPenalties.galWeak.hiddenThree[this.corruptions[3]] }} Dimension Boosts</span>
        <br>
        <span v-if="showC4nerf2">Gamespeed is raised to ^{{ localPenalties.galWeak.hiddenSix[this.corruptions[3]] }}</span>
        <br>
        <span v-if="showC4nerf3">Infinity Power conversion rate /{{ localPenalties.galWeak.hiddenEight[this.corruptions[3]] }}</span>
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
        Glyph Level ^{{ localPenalties.compGlyphs.level[corruptions[4]] }} and then {{ formatX(localPenalties.compGlyphs.level[corruptions[4]], 1, 2) }}. <br>
        Glyph Rarity ^{{ localPenalties.compGlyphs.rarity[corruptions[4]] }} and then {{ formatX(localPenalties.compGlyphs.rarity[corruptions[4]], 1, 2) }}.
        <br>
        <span v-if="showC5nerf1"> You are forced to equip {{ localPenalties.compGlyphs.hiddenFour[this.corruptions[4]] }} Cursed Glyphs<br> You cannot enter Doomed Reality</span> <br>
        <span v-if="showC5nerf2"> Alchemy is disabled</span>
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
        Tickspeed ^{{ formatInt(1) }}/{{ format(localPenalties.tickExtension[corruptions[5]], 2, 1) }}. <br>
        Time Shard Gain /{{ format(localPenalties.tickExtension[corruptions[5]], 2, 1) }}.
        Tickspeed ^{{formatInt(1)}}/{{format(localPenalties.tickExtension[this.corruptions[5]], 2, 1)}}. <br>
        Time Shard Gain /{{format(localPenalties.tickExtension[this.corruptions[5]], 2, 1)}}. <br>
        <span v-if="showC6nerf"> Triad Studies cannot be purchased</span>
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
        Antimatter exponent ^{{ format(localPenalties.atomDilution[corruptions[6]], 3, 3) }}.
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
        DT and TP gain ^{{ format(localPenalties.toD.power[corruptions[7]], 3, 3) }}. <br>
        DT gain ×{{ localPenalties.toD.mult[corruptions[7]].toString() }}.
        DT and TP gain ^{{format(localPenalties.toD.power[this.corruptions[7]], 3, 3)}}. <br>
        DT gain ×{{localPenalties.toD.mult[this.corruptions[7]].toString()}}. <br>
        <span v-if="showC8nerf1"> TT cost multiplier ×{{ localPenalties.toD.hiddenFive[this.corruptions[7]] }}</span> <br>
        <span v-if="showC8nerf2"> Dimension cost scaling ^{{ localPenalties.toD.hiddenEight[this.corruptions[7]] }}</span>
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
        Replicanti gain ^{{ localPenalties.repSing.rep[corruptions[8]].toString() }}. <br>
        Sigularity gain ^{{ localPenalties.repSing.sing[corruptions[8]].toString() }}. <br>
        Dark Matter gain ^{{ localPenalties.repSing.dm[corruptions[8]].toString() }}.
        Replicanti gain ^{{localPenalties.repSing.rep[this.corruptions[8]].toString()}}. <br>
        Sigularity gain ^{{localPenalties.repSing.sing[this.corruptions[8]].toString()}}. <br>
        Dark Matter gain ^{{localPenalties.repSing.dm[this.corruptions[8]].toString()}}. <br>
        IP, EP, RM gain ^{{ localPenalties.repSing.presGain[this.corruptions[8]] }} <br>
        <span v-if="showC9nerf"> Some Infinity, Eternity, Dilation, and Reality rebuyables are disabled</span>
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
        Studies TT cost ×{{ format(localPenalties.soF.ttcost[corruptions[9]], 0, 0) }}. <br>
        TD mult ^{{ localPenalties.soF.tdpow[corruptions[9]].toString() }}.
        Studies TT cost ×{{format(localPenalties.soF.ttcost[this.corruptions[9]], 0, 0)}}. <br>
        TD mult ^{{localPenalties.soF.tdpow[this.corruptions[9]].toString()}}. <br>
        <span v-if="showC10nerf1"> Triad Studies are disabled </span> <br>
        <span v-if="showC10nerf2"> Charged (Break) Infinity Upgrades and Eternity Challenge rewards are disabled</span>
      </div>
    </div>
    <PrimaryButton
      :class="respecClassObject"
      @click="respec = !respec"
    >
      Respec Hostility Upgrades on Mend
    </PrimaryButton>
    <div class="button-container">
      <!--<button
        class="o-pelle-button"
        @click="showModal"
      >
        Show full nerf effects of specific Hostilities
      </button> -->
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
