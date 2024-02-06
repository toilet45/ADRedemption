<script>
import PrimaryButton from "@/components/PrimaryButton";
import { DimBoost } from "../../../core/dimboost";

export default {
  name: "ClassicDimensionBoostRow",
  components: {
    PrimaryButton
  },
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
      type: 0,
      scaledBoostStart: 0
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    dimName() {
      return AntimatterDimension(this.requirement.tier).displayName;
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
    dimRequirementText(){
      return this.purchasedBoosts >= 1e9 ? "" : `: requires ${ formatInt(this.requirement.amount)} ${ this.dimName } Dimensions`
    },
    softcapText(){
      switch(this.type){
        case 1:
          return `Dimension Boost cost scaling increases past ${ format(this.scaledBoostStart, 2, 2)  } Dimension Boosts`
        default:
          return ""
      }
    },
    boostScale(){
      switch(this.type){
        case 1:
          return "Scaled";
        case 2:
          return "Superscaled";
        case 3:
          return "Warped";
        default:
          return "";
      }
    },
    classObject() {
      return {
        "o-primary-btn--dimboost l-dim-row__prestige-button": true,
        "tutorial--glow": this.isBuyable && this.hasTutorial,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    }
  },
  methods: {
    update() {
      const requirement = DimBoost.requirement;
      this.requirement.tier = requirement.tier;
      this.requirement.amount = requirement.amount;
      this.isBuyable = requirement.isSatisfied && DimBoost.canBeBought;
      this.purchasedBoosts = DimBoost.purchasedBoosts;
      this.imaginaryBoosts = DimBoost.imaginaryBoosts;
      this.lockText = DimBoost.lockText;
      this.unlockedByBoost = DimBoost.unlockedByBoost;
      this.creditsClosed = GameEnd.creditsClosed;
      if (this.isDoomed) this.requirementText = formatInt(this.purchasedBoosts);
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.DIMBOOST);
      this.type = DimBoost.type
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
  <div class="c-dimension-row c-antimatter-dim-row c-antimatter-prestige-row">
    <div class="l-dim-row__prestige-text c-dim-row__label c-dim-row__label--amount">
      {{ boostScale }} Dimension Boost ({{ boostCountText }}) {{ dimRequirementText }}
    <br>
    <div v-if="this.type > 0">
      {{ softcapText }}
    </div>
    </div>
    <PrimaryButton
      :enabled="isBuyable"
      :class="classObject"
      @click.exact="dimensionBoost(true)"
      @click.shift.exact="dimensionBoost(false)"
    >
      {{ unlockedByBoost }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </PrimaryButton>
  </div>
</template>
