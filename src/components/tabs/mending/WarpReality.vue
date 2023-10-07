<script>

import PrimaryButton from "@/components/PrimaryButton";
import WarpRealityButton from "./WarpRealityButton";

export default {
  name: "WarpReality",
  components: {
    PrimaryButton,
    WarpRealityButton,
  }
};

</script>

<template>
    <div class="l-break-infinity-tab">
        <h1>Have all Mending Upgrades Purchased, {{ formatInt(1e5) }} Multiversal Remains, and x total Ra Memory Levels to Warp Reality.</h1>
        <WarpRealityButton />
    </div>
</template>

<style scoped>

</style>