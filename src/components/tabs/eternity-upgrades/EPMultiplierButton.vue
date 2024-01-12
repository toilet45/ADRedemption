<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "EPMultiplierButton",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      isAutobuyerActive: false,
      isAutoUnlocked: false,
      isAffordable: false,
      multiplier: new Decimal(),
      cost: new Decimal(),
      isCapped: false,
      isActiveInDoom: false
    };
  },
  computed: {
    upgrade() {
      return EternityUpgrade.epMult;
    },
    autobuyer() {
      return Autobuyer.epMult;
    },
    classObject() {
      if (this.isDoomed) {
        return {
          "o-eternity-upgrade": true,
          "o-eternity-upgrade--useless": !this.isAffordable,
          "o-pelle-disabled-pointer": true,
          "o-pelle-disabled": true,
        };
      }
      return {
        "o-eternity-upgrade": true,
        "o-eternity-upgrade--bought": this.isCapped,
        "o-eternity-upgrade--available": !this.isCapped && this.isAffordable,
        "o-eternity-upgrade--unavailable": !this.isCapped && !this.isAffordable
      };
    },
    isDoomed: () => Pelle.isDoomed,
    effectLabel() {
      return `${this.isCapped?"Capped":"Currently"}:`
    }
  },
  watch: {
    isAutobuyerActive(newValue) {
      Autobuyer.epMult.isActive = newValue;
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isAutoUnlocked = this.autobuyer.isUnlocked;
      this.isAutobuyerActive = this.autobuyer.isActive;
      this.multiplier.copyFrom(upgrade.effectValue);
      this.cost.copyFrom(upgrade.cost);
      this.isAffordable = upgrade.isAffordable;
      this.isCapped = this.upgrade.isCapped;
      this.isActiveInDoom = Pelle.isDoomed && Ra.unlocks.unlockPelleIPAndEPMult.isUnlocked;
    },
    purchaseUpgrade() {
      if (RealityUpgrade(15).isLockingMechanics) RealityUpgrade(15).tryShowWarningModal();
      else this.upgrade.purchase();
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group l-margin-top">
    <button
      :class="classObject"
      @click="purchaseUpgrade"
    >
      <div v-if="isActiveInDoom">
        Multiply Eternity Points from all sources by {{ formatX(1.5, 1, 1) }}
        <br>
        {{ effectLabel }} {{ formatX(multiplier, 2, 1) }}
      </div>
      <div :class="{ 'o-pelle-disabled': isDoomed }" v-else>
        Multiply Eternity Points from all sources by {{ formatX(5) }}
        <br>
        {{ effectLabel }} {{ formatX(multiplier, 2, 0) }}
      </div>
      <template v-if="!isCapped">
        <br>
        Cost: {{ quantify("Eternity Point", cost, 2, 0) }}
      </template>
      <template v-if="isCapped">
        <span>(Capped at {{ quantify("purchase", upgrade.purchaseCap) }})</span>
      </template>
    </button>
    <PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="upgrade.buyMax(false)"
    >
      Max Eternity Point mult
    </PrimaryButton>
    <PrimaryToggleButton
      v-if="isAutoUnlocked"
      v-model="isAutobuyerActive"
      label="Autobuy EP mult"
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
    />
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}
</style>
