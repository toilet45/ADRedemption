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
      this.totalUpgrades = player.totalTickGained;
      this.percentSoftcap = 50;
      this.boostPoints.copyFrom(Currency.galBoostPoints);
      this.shardsPerSecond.copyFrom(MultiversalDimension(1).productionPerSecond);
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
        <span class="c-time-dim-description__accent">{{ format(boostPoints, 2, 1) }}</span> Time Shards.
      </p>
    </div>
    <div>You are getting {{ format(shardsPerSecond, 2, 0) }} {{ incomeType }} per second.</div>
    <div class="l-dimensions-container">
      <NewMultiversalDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
  </div>
</template>
