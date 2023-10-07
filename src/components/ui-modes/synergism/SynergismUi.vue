<script>
import MendingPointsHeader from "../../MendingPointsHeader.vue";
import BigCrunchButton from "../BigCrunchButton";
import SynergismGameHeader from "./SynergismGameHeader";
import NewsTicker from "../NewsTicker";
import MendingButton from "../prestige-header/MendingButton.vue";


import SynergismSubtabBar from "./SynergismSubtabBar";
import SynergismTabBar from "./SynergismTabBar";
import SynergismEPHeader from "./SynergismEpHeader";
import InfinityPointsHeader from "@/components/InfinityPointsHeader";

export default {
  name: "SynergismUi",
  components: {
    SynergismGameHeader,
    SynergismSubtabBar,
    SynergismTabBar,
    InfinityPointsHeader,
    SynergismEPHeader,
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
      href="stylesheets/synergism.css"
    >
    <BigCrunchButton />
    <template v-if="!bigCrunch">
      <div 
      v-if="hasMendingButton"
      class="c-mending-points">
        <MendingPointsHeader />
        <MendingButton />
    </div>
      <SynergismGameHeader/>
      <SynergismTabBar />
      <component
        :is="tab.config.before"
        v-if="tab.config.before"
      />
      <SynergismSubtabBar />
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
