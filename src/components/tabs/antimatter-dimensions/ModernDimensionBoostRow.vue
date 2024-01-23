<script>
import { DimBoost } from '../../../core/dimboost';

export default {
  name: "ModernDimensionBoostRow",
  data() {
    return {
      requirement: {
        tier: 1,
        amount: 0
      },
      isBuyable: false,
      purchasedBoosts: 0,
      imaginaryBoosts: 0,
      lockText: null,
      unlockedByBoost: null,
      creditsClosed: false,
      requirementText: null,
      hasTutorial: false,
      type: DIMBOOST_TYPE.BOOST,
      seeText: true,
      scaledBoost: false,
      scaledBoostStart: 0
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    dimName() {
      return AntimatterDimension(this.requirement.tier).shortDisplayName;
    },
    typeName() {
      switch (this.type) {
        case DIMBOOST_TYPE.BOOST: return "Dimension Boosts";
        case DIMBOOST_TYPE.SHIFT: return "Scaled Dimension Boosts";
        case DIMBOOST_TYPE.WARP: return "Superscaled Dimension Boosts";
        case DIMBOOST_TYPE.SCALE: return "Warped Dimension Boosts"
      }
      return undefined;
    },
    boostCountText() {
      if (this.requirementText) return this.requirementText;
      const parts = [this.purchasedBoosts];
      if (this.imaginaryBoosts !== 0) {
        parts.push(this.imaginaryBoosts);
      }
      const sum = parts.map(formatInt).join(" + ");
      if (parts.length >= 2) {
        return `${sum} = ${formatInt(parts.sum())}`;
      }
      return sum;
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "tutorial--glow": this.isBuyable && this.hasTutorial,
        "o-primary-btn--disabled": !this.isBuyable,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      const requirement = DimBoost.requirement;
      this.type = DimBoost.type
      this.requirement.tier = requirement.tier;
      this.requirement.amount = requirement.amount;
      this.isBuyable = requirement.isSatisfied && DimBoost.canBeBought;
      this.purchasedBoosts = DimBoost.purchasedBoosts;
      this.imaginaryBoosts = DimBoost.imaginaryBoosts;
      this.lockText = DimBoost.lockText;
      this.unlockedByBoost = DimBoost.unlockedByBoost;
      this.creditsClosed = ((GameEnd.creditsEverClosed && !PlayerProgress.mendingUnlocked()) || (PlayerProgress.mendingUnlocked() && player.isGameEnd));
      if (this.isDoomed) this.requirementText = formatInt(this.purchasedBoosts);
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.DIMBOOST);
      this.seeText = this.purchasedBoosts < 1e9;
      this.scaledBoost = this.type > 0;
      this.scaledBoostStart = DimBoost.shiftStart;
    },
    dimensionBoost(bulk) {
      if (!DimBoost.requirement.isSatisfied || !DimBoost.canBeBought) return;
      manualRequestDimensionBoost(bulk);
    }
  }
};
</script>

<template>
  <div class="reset-container dimboost">
    <h4>{{ typeName }} ({{ boostCountText }})</h4>
    <span v-if="seeText">Requires: {{ formatInt(requirement.amount) }} {{ dimName }} Antimatter Dimensions</span>
    <span v-if="scaledBoost">Dimension Boost cost scaling increases past {{ format(scaledBoostStart, 2, 2)  }} Dimension Boosts</span>
    <button
      :class="classObject"
      @click.exact="dimensionBoost(true)"
      @click.shift.exact="dimensionBoost(false)"
    >
      {{ unlockedByBoost }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </button>
  </div>
</template>
