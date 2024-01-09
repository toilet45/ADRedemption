<script>
import BigCrunchButton from "../BigCrunchButton";
import HeaderBlackHole from "../HeaderBlackHole";
import HeaderChallengeDisplay from "../HeaderChallengeDisplay";
import HeaderChallengeEffects from "../HeaderChallengeEffects";
import HeaderPrestigeGroup from "../HeaderPrestigeGroup";
import NewsTicker from "../NewsTicker";
import MendingButton from "../prestige-header/MendingButton.vue";
import MendingPointsHeader from "../../MendingPointsHeader.vue";

import GameSpeedDisplay from "@/components/GameSpeedDisplay";


export default {
  name: "ModernUi",
  components: {
    BigCrunchButton,
    HeaderChallengeDisplay,
    HeaderChallengeEffects,
    NewsTicker,
    HeaderBlackHole,
    HeaderPrestigeGroup,
    GameSpeedDisplay,
    MendingPointsHeader,
    MendingButton,
  },
  data() {
    return {
      bigCrunch: false,
      hasReality: false,
      newGameKey: "",
      hasMendingButton: false,
      mendingPoints: new Decimal(0)
    };
  },
  computed: {
    news() {
      return this.$viewModel.news;
    },
    topMargin() {
      return this.$viewModel.news ? "" : "margin-top: 3.9rem";
    }
  },
  methods: {
    update() {
      const crunchButtonVisible = !player.break && Player.canCrunch;
      this.bigCrunch = crunchButtonVisible && Time.bestInfinityRealTime.totalMinutes.gt(1);
      this.hasReality = PlayerProgress.realityUnlocked();
      // This only exists to force a key-swap after pressing the button to start a new game; the news ticker can break
      // if it isn't redrawn
      this.newGameKey = Pelle.isDoomed;
      this.hasMendingButton = PlayerProgress.mendingUnlocked() || (player.isGameEnd && GameEnd.endState >= 14.5);
      this.mendingPoints.copyFrom(Currency.mendingPoints.value.floor());
    },
    handleClick() {
      if (PlayerProgress.infinityUnlocked()) manualBigCrunchResetRequest();
      else Modal.bigCrunch.show();
    }
  },
};
</script>

<template>
  <div id="page">
    <link
      rel="stylesheet"
      type="text/css"
      href="stylesheets/modern-styles.css"
    >
    <div
      :key="newGameKey"
      class="game-container"
      :style="topMargin"
    >
      <NewsTicker
        v-if="news"
      />
      <div 
      v-if="hasMendingButton"
      class="c-mending-points">
        <MendingPointsHeader />
        <MendingButton />
    </div>
      <BigCrunchButton />
      <div
        v-if="!bigCrunch"
        class="tab-container"
      >
        <HeaderPrestigeGroup />
        <div class="information-header">
          <HeaderChallengeDisplay />
          <HeaderChallengeEffects />
          <GameSpeedDisplay v-if="hasReality" />
          <br v-if="hasReality">
          <HeaderBlackHole />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-mending-points {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
