<script>

import PrimaryButton from "@/components/PrimaryButton";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.vue";


export default {
  name: "KohlersRealm",
  components: {
    PrimaryButton,
    CelestialQuoteHistory
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
        borderRight: "0.5rem solid var(--color-kohler--base)"
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
  }
};

</script>

<template>
    <div class="kohler-celestial-tab">
      <h1>Coming in 5 Hours(tm)</h1>
      <span>
        Actually I want to add a cool progress system so if you see anything mess here just ignore--sxy
      </span>
      <div class="progress-container">
        <div class="circle" v-for="(item, index) in progressItems" :key="index" :style="{ left: item.position + '%', backgroundColor: item.color }">
          <div class="circle-inner"></div>
          <div class="circle-text">{{ item.text }}</div>
        </div>
        <div class="progress-wrapper">
          <div class="background-line"></div>
          <div class="filled-line" :style="{ width: KohlerProgress + '%' }"></div>
        </div>
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
.progress-container {
  position: relative;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
}

.circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #a52a2a; /* 默认深红色 */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.circle-inner {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
}

.circle-text {
  margin-top: 5px;
  font-size: 12px;
  color: #a52a2a; /* 深红色 */
}

.progress-wrapper {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #a52a2a; /* 深红色 */
}

.background-line {
  width: 100%;
  height: 100%;
  background-color: #a52a2a; /* 绿色 */
}

.filled-line {
  position: absolute;
  height: 100%;
  background-color: #007f5f; /* 绿色 */
}
</style>