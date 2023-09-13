<script>
export default {
  name: "SynergismRealityButton",
  data() {
    return {
      canReality: false,
    };
  },
  computed: {
    classObject() {
      return {
        "syn-reality-button--unlocked": this.canReality,
        "syn-reality-button--locked": !this.canReality,
      };
    }
  },
  methods: {
    update() {
      this.canReality = isRealityAvailable();
    },
    handleClick() {
      if (this.canReality) {
        requestManualReality();
      }
    }
  }
};
</script>

<template>
  <img 
  class="syn-button-size"
  :src="`images/synergismUI/reality.png`"
  v-on:click=handleClick />
</template>

<style scoped>

</style>
