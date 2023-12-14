<script>
import PrimaryButton from "@/components/PrimaryButton";
import ClassicMultiversalDimensionRow from "./ClassicMultiversalDimensionRow.vue";

export default {
  name: "ClassicMultiversalDimensionsTab",
  components: {
    PrimaryButton,
    ClassicMultiversalDimensionRow
},
  data() {
    return {
      totalUpgrades: 0,
      percentSoftcap: 0,
      boostPoints: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      shortenTSU: false
    };
  },
  computed: {
    costIncreases: () => MultiversalDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.totalUpgrades = player.totalTickGained;
      this.percentSoftcap = 50;
      this.boostPoints.copyFrom(Currency.galBoostPoints);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(MultiversalDimension(1).productionPerRealSecond);
      this.incomeType = "Galactic Shards";
      this.areAutobuyersUnlocked = false;//Autobuyer.timeDimension(1).isUnlocked;
      this.shortenTSU = FreeTickspeed.amount >= 1e11;
    },
    maxAll() {
      tryUnlockMultiversalDimensions();
      maxAllMultiversalDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllMultiversalDims();
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
        <span class="c-time-dim-description__accent">{{ format(boostPoints, 2, 1) }}</span> Galactic Shards.
      </p>
    </div>
    <div>
      The effectiveness of Galactic Shards decreases above {{ format(50) }}%.
    </div>
    <div>
      You are getting {{ format(shardsPerSecond, 2, 0) }} {{ incomeType }} per second.
    </div>
    <div class="l-dimensions-container">
      <ClassicMultiversalDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
  </div>
</template>
