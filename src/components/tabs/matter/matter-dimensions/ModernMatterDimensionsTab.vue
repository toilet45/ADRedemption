<script>
import MatterDimensionRow from "@/components/tabs/matter/matter-dimensions/ModernMatterDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernMatteratterDimensionsTab",
  components: {
    PrimaryButton,
    MatterDimensionRow,
  },
  data() {
    return {
      buyUntil10: true,
      buy10Mult: new Decimal(0),
      disabledCondition: "",
      isQuickResetAvailable: false,
      hasContinuum: false,
      isContinuumActive: false,
      energy: new Decimal(0),
      energyRate: new Decimal(0),
      energyEffect: new Decimal(0),
      weakMatter: new Decimal(0)
    };
  },
  computed: {
  },
  methods: {
    maxAll() {
      maxAll();
    },
    // Toggle single/10 without Continuum, otherwise cycle through all 3 if it's unlocked
    changeBuyMode() {
      if (!this.hasContinuum) {
        player.buyUntil10 = !player.buyUntil10;
        return;
      }
      // "Continuum" => "Until 10" => "Buy 1" => "Continuum"
      if (this.isContinuumActive) {
        Laitela.setContinuum(false);
        player.buyUntil10 = true;
      } else if (player.buyUntil10) {
        player.buyUntil10 = false;
      } else {
        Laitela.setContinuum(true);
      }
    },
    getUntil10Display() {
      if (this.isContinuumActive) return "Continuum";
      return this.buyUntil10 ? "Until 10" : "Buy 1";
    },
    update() {
      this.buyUntil10 = player.buyUntil10;
      this.hasContinuum = false;
      this.isContinuumActive = false;
      this.isQuickResetAvailable = Player.isInAntimatterChallenge && Player.antimatterChallenge.isQuickResettable;
      this.energy.copyFrom(Currency.energy.value);
      this.energyRate = this.weakMatter.times((energyGainMult()));
      this.energyEffect = energyEffect();
      this.weakMatter.copyFrom(Currency.weakMatter.value);
    }
  }
};
</script>

<template>
  <div class="l-antimatter-dim-tab">
    <div class="modes-container">
      <button
        class="o-primary-btn l-button-container"
        @click="changeBuyMode"
      >
        {{ getUntil10Display() }}
      </button>
      <button
        class="o-primary-btn l-button-container"
        @click="maxAll"
      >
        Max All (M)
      </button>
    </div>
    <p>
    You have <span class="c-infinity-dim-description__accent">{{ format(weakMatter, 2, 1) }}</span> Weak Matter which is producing {{format(energyRate, 2, 2)}} energy per in-game second in IC9
    </p>
    <p>
    You have <span class="c-infinity-dim-description__accent">{{ format(energy, 2, 1) }}</span> energy which raises Tickspeed in Kohler's Realm by <span class="c-infinity-dim-description__accent">{{ formatPow(energyEffect, 3, 3) }}</span>
    </p>
    <div class="l-dimensions-container">
      <MatterDimensionRow
        v-for="tier in 4"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div class="resets-container">
    </div>
  </div>
</template>

<style scoped>
.l-button-container {
  width: 100px;
  height: 30px;
  padding: 0;
}
</style>
