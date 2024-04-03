<script>

import PrimaryButton from "@/components/PrimaryButton";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.vue";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import { Glyphs, Kohler } from "../../../core/globals";
import KohlerUpgradeButton from "./KohlerUpgradeButton.vue";
import KohlerMilestoneRow from "./KohlerMilestoneRow.vue";

export default {
  name: "KohlersRealm",
  components: {
    PrimaryButton,
    CelestialQuoteHistory,
    CustomizeableTooltip,
    KohlerUpgradeButton,
    KohlerMilestoneRow
  },
  data() {
    return {
      unlocked: false,
      kohlerProgress: 0,
      time: new Date().getTime(),
      bestAM: new Decimal(0),
      isRunning: false,
      totalRows: [],
    };
  },
  computed: {
    upgrades: () => KohlerUpgrades.all,
    runningText(){
      return this.isRunning ? "Exit Kohler's Realm" : "Enter Kohler's Realm"
    },
    unlockInfos: () => KohlerProgressUnlocks.all,
    showRunReward() {
      return this.bestAM.gt(1);
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
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    },
    update() {
      this.now = new Date().getTime();
      this.unlocked = this.kohlerProgress >= 100;
      this.kohlerProgress = Kohler.unlockProgress;//temporary number
      this.isRunning = Kohler.isRunning;
      this.totalRows = [...KohlerMilestones.allRows];
    },
    startRun() {
      if (!Kohler.isRunning) player.mending.corruptionBackup = player.mending.corruption;
      mendingReset(false, true);
      player.celestials.ra.charged = new Set();
      player.celestials.ra.breakCharged = new Set();
      player.mending.corruptionChallenge.corruptedMend = Kohler.isRunning ? true : false;
      player.mending.corruption = Kohler.isRunning ? [5,5,0,5,5,0,0,5,5,1] : player.mending.corruptionBackup;
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
      <div v-if="this.unlocked" class="l-achievement-grid">
      <KohlerMilestoneRow
        v-for="row in totalRows"
        :row="row"
      />
    </div>
      <div v-if="this.unlocked" class="l-mending-upgrade-grid">
      <div
        v-for=" row in 5"
        :key="row"
        class="l-mending-upgrade-grid__row">
      <KohlerUpgradeButton 
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
        class="l-mending-upgrade-grid__cell"
        />
      </div>
    </div>
    </div>
</template>

<style scoped>
.c-remains-amount {
  font-size: 1.5rem;
  color: var(--color-text);
}

.l-mending-upgrade-grid{
  display: flex;
  flex-direction: column;
}

.l-mending-upgrade-grid__row{
  display: flex;
  flex-direction: row;
}

.l-mending-upgrade-grid__cell{
  margin: 0.5rem 0.8rem;
}
.c-remains-amount__accent {
  font-size: 2rem;
  color: var(--color-mending);
}
.c-mending-upgrade-infotext {
  font-size: 1rem;
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>