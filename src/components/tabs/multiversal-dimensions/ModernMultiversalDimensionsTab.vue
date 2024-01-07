<script>
import NewMultiversalDimensionRow from "./ModernMultiversalDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "NewMultiversalDimensionsTab",
  components: {
    PrimaryButton,
    NewMultiversalDimensionRow
  },
  data() {
    return {
      totalUpgrades: 0,
      percentSoftcap: 0,
      boostPoints: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      shortenTSU: false,
    };
  },
  computed: {
    costIncreases: () => MultiversalDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.totalUpgrades = 0;
      this.percentSoftcap = 50;
      this.boostPoints.copyFrom(Currency.galBoostPoints);
      this.shardsPerSecond = MultiversalDimension(1).productionPerRealSecond.div(getGameSpeedupForDisplay());
      this.incomeType = "Galactic Shards";
      this.areAutobuyersUnlocked = false;//Autobuyer.timeDimension(1).isUnlocked;
      this.shortenTSU = false//FreeTickspeed.amount >= 1e11;
    },
    maxAll() {
      tryUnlockMultiversalDimensions();
      maxAllMultiversalDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllMultiversalDims();
    },
    txt1() {
      if (this.boostPoints.lte(1e50)) {
        return `making all Galaxies `
      }
      return `providing an `
    },
    txt2() {
      if (this.boostPoints.eq(0)){
        return `${format(0, 2, 2)}%`
      }
      else if (this.boostPoints.lte(1e50)) {
        return `${format(this.boostPoints.pow(1/(this.boostPoints.log10() ** 0.8)), 2, 2)}%`
      }
      return `${formatX((this.boostPoints.pow(1/(this.boostPoints.log10() ** 0.8))).div(100).add(1), 2, 2)}`
    },
    txt3() {
      if (this.boostPoints.lte(1e50)) {
        return ` stronger`
      }
      return ` multiplier to all galaxies`
    }
  }
};
</script>

<template>
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        Max all
      </PrimaryButton>
      <!--<PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        Toggle all autobuyers
      </PrimaryButton>-->
    </div>
    <div>
      <p>
        You have gained
        <span class="c-multiversal-dim-description__accent">{{ format(boostPoints, 2, 1) }}</span> Galactic Shards, {{ txt1() }}<span class="c-multiversal-dim-description__accent">{{ txt2() }}</span>{{ txt3() }}.
      </p>
    </div>
    <div>You are getting {{ format(shardsPerSecond, 2, 0) }} {{ incomeType }} per second, unaffected by game speed.</div>
    <div class="l-dimensions-container">
      <NewMultiversalDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
  </div>
</template>
