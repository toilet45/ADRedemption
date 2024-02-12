<script>
import { PlayerProgress } from "../../../core/player-progress";
import BreakInfinityButton from "./BreakInfinityButton";
import InfinityUpgradeButton from "@/components/InfinityUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "BreakInfinityTab",
  components: {
    PrimaryButton,
    BreakInfinityButton,
    InfinityUpgradeButton
  },
  data() {
    return {
      isUseless: false,
      isUnlocked: false,
      chargeUnlocked: false,
      totalCharges: 0,
      chargesUsed: 0,
      disCharge: false,
    };
  },
  computed: {
    grid() {
      return [
        [
          BreakInfinityUpgrade.totalAMMult,
          BreakInfinityUpgrade.currentAMMult,
          BreakInfinityUpgrade.galaxyBoost,
        ],
        [
          BreakInfinityUpgrade.infinitiedMult,
          BreakInfinityUpgrade.achievementMult,
          BreakInfinityUpgrade.slowestChallengeMult,
        ],
        [
          BreakInfinityUpgrade.infinitiedGen,
          BreakInfinityUpgrade.autobuyMaxDimboosts,
          BreakInfinityUpgrade.autobuyerSpeed
        ],
        [
          BreakInfinityUpgrade.tickspeedCostMult,
          BreakInfinityUpgrade.dimCostMult,
          BreakInfinityUpgrade.ipGen
        ]
      ];
    },
    disChargeClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--charged-respec-active": this.disCharge
      };
    },
  },
  watch: {
    disCharge(newValue) {
      player.celestials.ra.breakDischarge = newValue;
    }
  },
  methods: {
    update() {
      this.isUseless = Pelle.isDoomed;
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval || PlayerProgress.mendingUnlocked();
      this.chargeUnlocked = Ra.unlocks.chargedBreakInfinityUpgrades.canBeApplied && !Pelle.isDoomed;
      this.totalCharges = Ra.totalBreakCharges;
      this.chargesUsed = Ra.totalBreakCharges - Ra.breakChargesLeft;
      this.disCharge = player.celestials.ra.breakDischarge;
    },
    btnClassObject(column) {
      const classObject = {
        "l-infinity-upgrade-grid__cell": true,
        "o-infinity-upgrade-btn--multiplier": column === 3
      };
      classObject[`o-infinity-upgrade-btn--color-${column}`] = true;
      return classObject;
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    },
  }
};
</script>

<template>
  <div class="l-break-infinity-tab">
    <div
      v-if="chargeUnlocked"
      class="c-subtab-option-container"
    >
      <PrimaryButton
        :class="disChargeClassObject"
        @click="disCharge = !disCharge"
      >
        Respec Charged Break Infinity Upgrades on next Reality
      </PrimaryButton>
    </div>
    <div v-if="chargeUnlocked">
      You have charged {{ formatInt(chargesUsed) }}/{{ formatInt(totalCharges) }} Break Infinity Upgrades.
      Charged Break Infinity Upgrades have their effect altered.
      <br>
      Hold shift to show Charged Infinity Upgrades. You can freely respec your choices on Reality.
    </div>
    <div v-if="chargeUnlocked">
    <div v-if="isUseless">
      You cannot Charge Break Infinity Upgrades while Doomed.
    </div>
    </div>
    <div v-if="!isUnlocked">
      Reduce the interval of Automatic Big Crunch Autobuyer to
      {{ format(0.1, 1, 1) }} seconds to unlock Break Infinity.
    </div>
    <BreakInfinityButton class="l-break-infinity-tab__break-btn" />
    <div
      v-if="isUnlocked"
      class="l-break-infinity-upgrade-grid l-break-infinity-tab__grid"
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-break-infinity-upgrade-grid__row"
      >
        <InfinityUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          :isBreak="true"
          :class="btnClassObject(columnId)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
