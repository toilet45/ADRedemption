<script>

import PrimaryButton from "@/components/PrimaryButton";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.vue";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import { Glyphs, Kohler } from "../../../core/globals";

export default {
  name: "KohlersRealm",
  components: {
    PrimaryButton,
    CelestialQuoteHistory,
    CustomizeableTooltip
  },
  data() {
    return {
      unlocked: false,
      kohlerProgress: 0,
      time: new Date().getTime(),
      bestAM: new Decimal(0),
      isRunning: false,
    };
  },
  computed: {
    runningText(){
      return this.isRunning ? "Exit Kohler's Realm" : "Enter Kohler's Realm."
    },
    unlockInfos: () => KohlerProgressUnlocks.all,
    showRunReward() {
      return this.bestAM.gt(1);
    },
    upgrades() {
      const upgrades = [];
      return upgrades;
    },
    runButtonClassObject() {
      return {
        "c-kohler-run-button__icon": true,
        "c-kohler-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[8].effects();
    },
    unlockInfoTooltipArrowStyle() {
      return {
        borderBottom: "0.5rem solid var(--color-mending)"
      };
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.now = new Date().getTime();
      this.unlocked = false;
      this.kohlerProgress = Kohler.unlockProgress;//temporary number
      this.isRunning = Kohler.isRunning
    },
    startRun() {
      if (!Kohler.isRunning) player.mending.corruptionBackup = player.mending.corruption;
      mendingReset(false);
      player.celestials.ra.charged = new Set();
      player.celestials.ra.breakCharged = new Set();
      player.transcendents.kohler.run = !player.transcendents.kohler.run;
      player.mending.corruptionChallenge.corruptedMend = Kohler.isRunning ? true : false;
      player.mending.corruption = Kohler.isRunning ? [6,6,6,6,6,6,6,6,6,6] : player.mending.corruptionBackup;
      return;
      /*if (this.isDoomed) return;
      Modal.celestials.show({ name: "Teresa's", number: 0 });*/
    },

    unlockDescriptionWidth(unlockInfo) {
      const pos = unlockInfo.config.progress;
      return `${pos}%`;
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked;
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-kohler-progressunlock-description": true,
        "c-kohler-progressunlock-description--unlocked": this.hasUnlock(unlockInfo)
      };
    },
    unlockDescriptionBottom(unlockInfo) {
      const pos = -unlockInfo.config.id % 2 *65 -1;
      return `${pos}px`;
    },
  }
};



</script>

<template>
    <div class="kohler-celestial-tab">
      <h1>Coming in 5 Hours(tm)</h1>
      <span>
        Actually I want to add a cool progress system so if you see anything mess here just ignore--sxy
      </span>
      <div class="c-kohler-progressbar">
        <div
            class="c-kohler-progressbar-inner c-kohler-progressbar-inner--light"
            :style="{ width: '100%'}"
          />
        <div
          class="c-kohler-progressbar-inner"
          :style="{ width: kohlerProgress + '%'}"
        >
        </div>
        <CustomizeableTooltip
            v-for="unlockInfo in unlockInfos"
            :key="unlockInfo.id"
            content-class="c-kohler-progressunlock-description--hover-area"
            :left="unlockDescriptionWidth(unlockInfo)"
            :bottom="unlockDescriptionBottom(unlockInfo)"
            mode="bottom"
            :show="true"
            :tooltip-arrow-style="unlockInfoTooltipArrowStyle"
            :tooltip-class="unlockInfoTooltipClass(unlockInfo)"
        >
          <template #tooltipContent>
            <b>
              {{ unlockInfo.description }}
            </b>
          </template>
        </CustomizeableTooltip>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <div v-if="this.unlocked">
      <CelestialQuoteHistory celestial="kohler" />
      </div>
      <div v-if="this.unlocked" class="l-mechanics-container">
          <div>
            <div class="l-kohler-mechanic-container">
              <div class="c-kohler-unlock c-kohler-run-button">
              <span>
                {{ runningText }}
              </span>
              <div :class="runButtonClassObject" @click="startRun()">
                <i class='fa-solid fa-staff-snake'></i>
              </div>
              {{ runDescription }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>