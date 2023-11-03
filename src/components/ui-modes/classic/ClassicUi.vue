<script>
import MendingPointsHeader from "../../MendingPointsHeader.vue";
import BigCrunchButton from "../BigCrunchButton";
import GameHeader from "../GameHeader";
import NewsTicker from "../NewsTicker";
import MendingButton from "../prestige-header/MendingButton.vue";


import ClassicSubtabBar from "./ClassicSubtabBar";
import ClassicTabBar from "./ClassicTabBar";
import EternityPointsHeader from "@/components/EternityPointsHeader";
import InfinityPointsHeader from "@/components/InfinityPointsHeader";

export default {
  name: "ClassicUi",
  components: {
    GameHeader,
    ClassicSubtabBar,
    ClassicTabBar,
    NewsTicker,
    InfinityPointsHeader,
    EternityPointsHeader,
    BigCrunchButton,
    MendingButton,
    MendingPointsHeader,
},
  data() {
    return {
      bigCrunch: false,
      smallCrunch: false,
      newGameKey: "",
      hasMendingButton: false,
      mendingPoints: new Decimal(0)
    };
  },
  computed: {
    tab: () => Tabs.current,
    news() {
      return this.$viewModel.news;
    }
  },
  methods: {
    update() {
      const crunchButtonVisible = !player.break && Player.canCrunch;
      this.bigCrunch = crunchButtonVisible && Time.bestInfinityRealTime.totalMinutes > 1;
      // This only exists to force a key-swap after pressing the button to start a new game; the news ticker can break
      // if it isn't redrawn
      this.newGameKey = Pelle.isDoomed;
      this.hasMendingButton = PlayerProgress.mendingUnlocked() || (player.isGameEnd && GameEnd.endState >= 14.5);// && player.celestials.destroyer.quoteBits > 0);
      this.mendingPoints.copyFrom(Currency.mendingPoints.value.floor());
    }
  },
};
</script>

<template>
  <div
    id="container"
    :key="newGameKey"
    class="container c-classic l-Classic"
  >
    <link
      rel="stylesheet"
      type="text/css"
      href="stylesheets/classic.css"
    >
    <BigCrunchButton />
    <template v-if="!bigCrunch">
      <NewsTicker
        v-if="news"
        class="l-classic__news-bar"
      />
      <div 
      v-if="hasMendingButton"
      class="c-mending-points">
        <MendingPointsHeader />
        <MendingButton />
    </div>
      <GameHeader class="l-classic__header" />
      <ClassicTabBar />
      <component
        :is="tab.config.before"
        v-if="tab.config.before"
      />
      <ClassicSubtabBar />
      <div class="l-classic__page">
        <slot />
      </div>
    </template>
  </div>
</template>

<style scoped>
.c-mending-points {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
