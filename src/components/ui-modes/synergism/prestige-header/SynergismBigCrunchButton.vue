<script>
export default {
  name: "SynergismBigCrunchButton",
  data() {
    return {
      canInfinity: false,
    };
  },
  computed: {
    classObject() {
      return {
        "syn-infinity-button--unlocked": this.canInfinity,
        "syn-infinity-button--locked": !this.canInfinity,
      };
    }
  },
  methods: {
    update() {
      this.canInfinity = Player.canCrunch;
    },
    handleClick() {
      if (this.canInfinity) {
        bigCrunchResetRequest();
      }
    }
  }
};
</script>

<template>
  <img 
  class="syn-button-size"
  :src="`images/synergismUI/infinity.png`"
  v-on:click=handleClick />
</template>

<style scoped>

</style>
