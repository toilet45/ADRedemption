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
      time: new Date().getTime(),
      bestAM: new Decimal(0),
      isRunning: false,
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