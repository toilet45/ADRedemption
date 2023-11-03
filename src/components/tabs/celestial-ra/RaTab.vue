<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import RaPet from "./RaPet";
import RaPetRemembranceButton from "./RaPetRemembranceButton";
import RaUpgradeButton from "./RaUpgradeButton.vue";

export default {
  name: "RaTab",
  components: {
    RaPet,
    RaPetRemembranceButton,
    CelestialQuoteHistory,
    RaUpgradeButton,
  },
  data() {
    return {
      memoriesPerChunk: 0,
      showReality: false,
      isRaCapped: false,
      totalLevels: 0,
      showRemembrance: false,
      hasRemembrance: false,
      remembranceReq: 0,
      remembranceMult: 1,
      remembranceNerf: 1,
      petWithRemembrance: "",
      isRunning: false,
      memoryBoosts: "",
      shopUnlocked: false
    };
  },
  computed: {
    laitelaUnlock: () => Laitela.isUnlocked,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeVisible: () => Ra.unlocks.chargedInfinityUpgrades.isUnlocked,
        scalingUpgradeText: () => Ra.unlocks.chargedBreakInfinityUpgrades.isUnlocked? 
                                  `You can Charge ${quantifyInt("Break Infinity Upgrade", Ra.totalBreakCharges)}.`:
                                  `You can Charge ${quantifyInt("Infinity Upgrade", Ra.totalCharges)}.`,
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeVisible: () => AlchemyResources.all.filter(r => r.isUnlocked).length > 0,
        scalingUpgradeText: () => {
          const resources = AlchemyResources.all.filter(r => r.isUnlocked).length;
          return `You have unlocked ${quantifyInt("Alchemy Resource", resources)}.`;
        },
      },
      {
        pet: Ra.pets.enslaved,
        scalingUpgradeVisible: () => Ra.unlocks.improvedStoredTime.isUnlocked,
        scalingUpgradeText: () => `Stored game time
          ${formatX(Ra.unlocks.improvedStoredTime.effects.gameTimeAmplification.effectOrDefault(1), 2)} and real time
          +${formatInt(Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600))} hours`,
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeVisible: () => Ra.unlocks.unlockHardV.isUnlocked,
        scalingUpgradeText: () => {
          const triadCount = Ra.unlocks.unlockHardV.effectOrDefault(0);
          return `You have unlocked ${quantifyInt("Triad Study", triadCount)}.`;
        },
      },
      {
        pet: Ra.pets.ra,
        scalingUpgradeVisible: () => false,
        scalingUpgradeText: () => ""
      },
      {
        pet: Ra.pets.laitela,
        scalingUpgradeVisible: () => true,
        scalingUpgradeText: () => `Dark Matter cap multiplied by ${formatX(new Decimal(1e10).pow(Ra.pets.laitela.level))}`
      },
      {
        pet: Ra.pets.pelle,
        scalingUpgradeVisible: () => false,
        scalingUpgradeText: () => ""
      },
    ],
    petStyle() {
      return {
        color: (this.petWithRemembrance === "")
          ? "white"
          : this.pets.find(pet => pet.pet.name === this.petWithRemembrance).pet.color,
      };
    },
    runButtonClassObject() {
      return {
        "c-ra-run-button__icon": true,
        "c-ra-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[4].effects().replace(/^\w/u, c => c.toUpperCase()).split("\n");
    },
    memoryDescription() {
      return `Within Ra's Reality, Memory Chunks for Celestial Memories
        will be generated based on certain resource amounts.`;
    },
    isDoomed: () => Pelle.isDoomed,
    dimboostUncapped: () => Ra.unlocks.raRealUncapDimboost.isUnlocked,
    upgrades: () => RaUpgrades.all,
    costScalingTooltip: () => `Cost Scaling is NYI`,
    possibleTooltip: () => `Striped upgrades are Not Yet Implemented [NYI].`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
    grid: () => [],
    classObject() {
      return {
        "o-warp-btn": true,
        "o-warp-btn--color-2": true,
        "o-warp-btn--available": this.canWarp,
        "o-warp-btn--unavailable": !this.canWarp,
        "o-warp-btn--unclickable": this.warped,
      };
    },
    tooltip() {
      return undefined
    },
    totalUpgFunc() {
     return WarpUpgrades.all.countWhere(u => u.isBought);
    },
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    },
    update() {
      this.memoriesPerChunk = Ra.productionPerMemoryChunk;
      this.isRaCapped = MendingUpgrade(19).isBought?RaPetRemembranceButton.totalPetLevel === 700 : Ra.totalPetLevel === 100;
      this.totalLevels = Ra.totalPetLevel;
      this.showRemembrance = Ra.unlocks.effarigUnlock.canBeApplied;
      this.hasRemembrance = Ra.remembrance.isUnlocked;
      this.remembranceReq = Ra.remembrance.requiredLevels;
      this.remembranceMult = Ra.remembrance.multiplier;
      this.remembranceNerf = Ra.remembrance.nerf;
      this.petWithRemembrance = Ra.petWithRemembrance;
      this.isRunning = Ra.isRunning;
      this.memoryBoosts = Ra.memoryBoostResources;
      this.shopUnlocked = Ra.unlocks.remembranceAlwaysActiveAndShopUnlock.isUnlocked;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Ra's", number: 4 });
    },
    toggleMode() {
      Ra.toggleMode();
    }
  },
};
</script>

<template>
  <div class="l-ra-celestial-tab">
    <div class="c-ra-memory-header">
      <CelestialQuoteHistory celestial="ra" />
      <div v-if="!isRaCapped">
        Each Memory Chunk generates a base of one Memory per second<span v-if="memoriesPerChunk > 1">,
          which has been increased to {{ quantify("Memory", memoriesPerChunk, 2, 3) }} per second</span>.
        <br>
        Storing real time prevents Memory Chunk generation, but Memories will still be gained normally.
        <span v-if="memoriesPerChunk > 1">
          <br>
          This is being increased due to {{ memoryBoosts }}.
        </span>
      </div>
      <div v-else>
        All Memories have been returned.
      </div>
    </div>
    <div>
      Mouse-over the icons below the bar to see descriptions of upgrades,
      <br>
      and mouse-over <i class="fas fa-question-circle" /> icons for specific resource information.
    </div>
    <div class="l-ra-all-pets-container">
      <RaPet
        v-for="(pet, i) in pets"
        :key="i"
        :pet-config="pet"
      />
    </div>
    <div class="l-ra-non-pets">
      <button class="c-ra-run-button">
        <h2 :class="{ 'o-pelle-disabled': isDoomed }">
          <span v-if="isRunning">You are in </span>
          <span v-else>Start </span>
          Ra's Reality
        </h2>
        <div
          :class="runButtonClassObject"
          @click="startRun"
        >
          <span class="c-ra-run-button__icon__sigil fas fa-sun" />
        </div>
        <span
          v-for="(line, lineId) in runDescription"
          :key="lineId + '-ra-run-desc'"
          :class="{ 'o-pelle-disabled': lineId===0 && dimboostUncapped}"
        >
          {{ line }}
        </span>
        <br>
        <span>
          {{ memoryDescription }}
        </span>
      </button>
      <div
        v-if="showRemembrance && !isRaCapped"
        class="c-ra-remembrance-unlock"
      >
        <h1 :style="petStyle">
          Remembrance
        </h1>
        <span :style="petStyle">
          Whichever Celestial has Remembrance will get {{ formatX(remembranceMult) }} Memory Chunk gain. The other
          Celestials will get {{ formatX(remembranceNerf, 1, 1) }} Memory Chunk gain.
        </span>
        <div
          v-if="hasRemembrance"
          class="c-ra-remembrance-unlock-inner"
        >
          <RaPetRemembranceButton
            v-for="(pet, i) in pets"
            :key="i"
            :pet-config="pet"
          />
        </div>
        <div
          v-else
          class="c-ra-remembrance-unlock-inner"
        >
          Unlocked by getting {{ formatInt(remembranceReq) }} total Celestial Memory levels
          (you need {{ formatInt(remembranceReq - totalLevels) }} more)
        </div>
      </div>
    </div>
    <div v-if="shopUnlocked">
    <div class="c-mending-upgrade-infotext">
      Stripped Upgrades (or ones that cost 1e300 RaP) are not yet implemented.
      <br>
      You can shift-click upgrades with <i class="fas fa-lock-open" /> to make the game prevent you
      from doing anything this Reality which would cause you to fail their unlock condition.
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-mending-upgrade-grid__row"
    >
      <RaUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
    </div>
  </div>
</template>
