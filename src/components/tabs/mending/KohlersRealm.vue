<script>

import PrimaryButton from "@/components/PrimaryButton";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.vue";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";

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
      progressItems: [
        { position: 10, text: 'text1' },
        { position: 50, text: 'text2' }
        // Add more items as needed, thank you GPT--sxy
      ]
    };
  },
  computed: {
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
      return GameDatabase.celestials.descriptions[6].effects();
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
      this.kohlerProgress = 50;//temporary number
    },
    startRun() {
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
      const pos = -unlockInfo.config.id % 2 *60 -1;
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
          :style="{ width: '50%'}"
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
      <div v-if="this.unlocked">
      <CelestialQuoteHistory celestial="kohler" />
      </div>
      <div v-if="this.unlocked" class="l-mechanics-container">
          <div>
            <div class="l-kohler-mechanic-container">
              <div class="c-kohler-unlock c-kohler-run-button">
              <span>
              Enter Kohler's Realm.
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