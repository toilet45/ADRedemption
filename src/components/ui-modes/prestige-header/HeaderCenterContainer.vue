<script>
import ArmageddonButton from "../../tabs/celestial-pelle/ArmageddonButton";
import RealityCurrencyHeader from "../../RealityCurrencyHeader";
import MendingButton from "./MendingButton";

import HeaderTickspeedInfo from "../HeaderTickspeedInfo";

import RealityButton from "./RealityButton";
import { PlayerProgress } from "../../../core/player-progress";
import MendingPointsHeader from "../../MendingPointsHeader.vue";

// This component contains antimatter and antimatter rate at the start of the game, as well as some additional
// information depending on the UI (tickspeed for Classic, game speed for Modern). Everything but antimatter is
// removed once Reality is unlocked, to make room for the reality button
export default {
  name: "HeaderCenterContainer",
  components: {
    HeaderTickspeedInfo,
    MendingButton,
    RealityCurrencyHeader,
    RealityButton,
    ArmageddonButton,
    MendingPointsHeader
},
  data() {
    return {
      shouldDisplay: true,
      isModern: false,
      hasRealityButton: false,
      hasMendingButton: false,
      isDoomed: false,
      antimatter: new Decimal(0),
      antimatterPerSec: new Decimal(0),
      mendingPoints: new Decimal(0)
    };
  },
  methods: {
    update() {
      this.shouldDisplay = player.break || !Player.canCrunch;
      if (!this.shouldDisplay) return;
      this.mendingPoints.copyFrom(Currency.mendingPoints.value.floor())
      this.isModern = player.options.UIType == 'Modern';
      this.isDoomed = Pelle.isDoomed;
      this.antimatter.copyFrom(Currency.antimatter);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      if (!this.hasRealityButton) this.antimatterPerSec.copyFrom(Currency.antimatter.productionPerSecond);
    },
  },
};
</script>

<template>
  <div
    v-if="shouldDisplay"
    class="c-prestige-button-container"
  >
      <span>You have <span class="c-game-header__antimatter">{{ format(antimatter, 2, 1) }}</span> antimatter.</span>
    <div
      v-if="hasRealityButton"
      class="c-reality-container"
    >
      <RealityCurrencyHeader />
      <ArmageddonButton
        v-if="isDoomed"
        :is-header="true"
      />
      <RealityButton v-else />
    </div>
    <div v-else>
      You are getting {{ format(antimatterPerSec, 2) }} antimatter per second.
      <br>
      <HeaderTickspeedInfo />
    </div>
  </div>
</template>

<style scoped>
.c-reality-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.c-mending-points {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
