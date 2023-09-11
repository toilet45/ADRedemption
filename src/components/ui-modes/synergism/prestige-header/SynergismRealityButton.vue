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
        "c-reality-button--unlocked": this.canReality,
        "c-reality-button--locked": !this.canReality,
        "c-reality-button--special": this.showSpecialEffect,
      };
    }
  },
  methods: {
    update() {
      this.canReality = isRealityAvailable();
      if (!this.canReality) {
        this.shardsGained = 0;
        return;
      }
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
  <div class="syn-button-size">
    <button
      class="c-reality-button infotooltip"
      :class="classObject"
      @click="handleClick"
    >
    <div class="l-reality-button__contents">
          <div class="c-reality-button__header">
            R
          </div>
        </div>
    </button>
  </div>
</template>

<style scoped>

</style>
