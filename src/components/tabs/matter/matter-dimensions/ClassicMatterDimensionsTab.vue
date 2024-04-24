<script>
import MatterDimensionRow from "./ClassicMatterDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicMatterDimensionsTab",
  components: {
    PrimaryButton,
    MatterDimensionRow,
  },
  data() {
    return {
      isQuickResetAvailable: false,
      buy10Mult: new Decimal(0),
      weakMatter: new Decimal(0),
      energy: new Decimal(0),
      energyRate: new Decimal(0),
      energyEffect: new Decimal(0)
    };
  },
  methods: {
    update() {
      this.isQuickResetAvailable = false;
      this.buy10Mult.copyFrom(MatterDimensions.buyTenMultiplier);
      this.weakMatter.copyFrom(Currency.weakMatter.value);
      this.energy.copyFrom(Currency.energy.value);
      this.energyRate = this.weakMatter.times((energyGainMult()));
      this.energyEffect = energyEffect();
    },
    quickReset() {
      softReset(-1, true, true);
    }
  }
};
</script>

<template>
  <div class="l-classic-antimatter-dim-tab">
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
    <div class="l-flex" />
  </div>
</template>

<style scoped>
.l-flex {
  flex: 1 0;
}
</style>
