<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ModernInfinityDimensionRow",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hasPrevTier: false,
      isUnlocked: false,
      multiplier: new Decimal(0),
      baseAmount: 0,
      amount: new Decimal(0),
      purchases: 0,
      rateOfChange: new Decimal(0),
      isAutobuyerUnlocked: false,
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isCapped: false,
      capIP: new Decimal(0),
      isAutobuyerOn: false,
      isEC8Running: false,
      hardcap: InfinityDimensions.HARDCAP_PURCHASES,
      requirementReached: false,
      eternityReached: false,
      showCostTitle: false,
      enslavedRunning: false,
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return InfinityDimension(this.tier).shortDisplayName;
    },
    rateOfChangeDisplay() {
      return ` (+${format(this.rateOfChange, 2, 2)}%/s)`;
    },
    costDisplay() {
      const requirement = InfinityDimension(this.tier).requirement;
      if (this.isUnlocked || this.shiftDown) {
        if (this.isCapped) return "Capped";
        return this.showCostTitle ? `Cost: ${format(this.cost)} IP` : `${format(this.cost)} IP`;
      }

      if (this.requirementReached) {
        return "Unlock";
      }

      return `Reach ${formatPostBreak(requirement)} AM`;
    },
    capTooltip() {
      if (this.enslavedRunning) return `Enslaved prevents the purchase of more than ${format(10)} Infinity Dimensions`;
      if (this.isCapped) return `Cap reached at ${format(this.capIP)} IP`;
      return `Purchased ${quantifyInt("time", this.purchases)}`;
    },
    showRow() {
      return this.eternityReached || this.isUnlocked || this.requirementReached || this.amount.gt(0) ||
        this.hasPrevTier;
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.infinityDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = InfinityDimension(tier);
      this.hasPrevTier = tier === 1 || InfinityDimension(tier - 1).isUnlocked;
      this.isUnlocked = dimension.isUnlocked;
      this.multiplier.copyFrom(dimension.multiplier);
      this.baseAmount = dimension.baseAmount;
      this.purchases = dimension.purchases;
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.isAutobuyerUnlocked = Autobuyer.infinityDimension(tier).isUnlocked;
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      if (!this.isUnlocked) {
        this.isAvailableForPurchase = dimension.requirementReached;
      }
      this.isCapped = dimension.isCapped;
      if (this.isCapped) {
        this.capIP.copyFrom(dimension.hardcapIPAmount);
        this.hardcap = dimension.purchaseCap;
      }
      this.isEC8Running = EternityChallenge(8).isRunning;
      this.isAutobuyerOn = Autobuyer.infinityDimension(tier).isActive;
      this.requirementReached = dimension.requirementReached;
      this.eternityReached = PlayerProgress.eternityUnlocked();
      this.showCostTitle = this.cost.exponent < 1000000;
      this.enslavedRunning = Enslaved.isRunning;
    },
    buyManyInfinityDimension() {
      if (!this.isUnlocked) {
        InfinityDimension(this.tier).tryUnlock();
        return;
      }
      buyManyInfinityDimension(this.tier);
    },
    buyMaxInfinityDimension() {
      if (!this.isUnlocked) {
        InfinityDimension(this.tier).tryUnlock();
        return;
      }
      buyMaxInfDims(this.tier);
    },
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-infinity-dim-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !requirementReached }"
  >
    <div class="c-dim-row__label c-dim-row__name">
      {{ name }} Infinity D <span class="c-infinity-dim-row__multiplier">{{ formatX(multiplier, 2, 1) }}</span>
    </div>
    <div class="c-dim-row__label c-dim-row__label--growable">
      {{ format(amount, 2, 0) }}
      <span
        v-if="rateOfChange.neq(0)"
        class="c-dim-row__label--small"
      >
        {{ rateOfChangeDisplay }}
      </span>
    </div>
    <PrimaryButton
      v-tooltip="capTooltip"
      :enabled="isAvailableForPurchase && !isCapped"
      class="o-primary-btn--buy-id l-dim-row__button o-primary-btn o-primary-btn--new"
      @click="buyManyInfinityDimension"
    >
      {{ costDisplay }}
    </PrimaryButton>
    <PrimaryToggleButton
      v-if="isAutobuyerUnlocked && !isEC8Running"
      v-model="isAutobuyerOn"
      class="o-primary-btn--id-autobuyer l-dim-row__button"
      label="Auto:"
    />
    <PrimaryButton
      v-else
      :enabled="isAvailableForPurchase"
      class="o-primary-btn--buy-id-max l-dim-row__button"
      @click="buyMaxInfinityDimension"
    >
      Buy Max
    </PrimaryButton>
  </div>
</template>