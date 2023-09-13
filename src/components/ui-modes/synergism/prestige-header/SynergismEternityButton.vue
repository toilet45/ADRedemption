<script>
export default {
  name: "SynergismEternityButton",
  data() {
    return {
      canEternity: false,
    };
  },
  computed: {
    classObject() {
      return {
        "syn-eternity-button--unlocked": this.canEternity,
        "syn-eternity-button--locked": !this.canEternity,
      };
    }
  },
  methods: {
    update() {
      this.canEternity =  Player.canEternity;
    },
    handleClick() {
      if (this.canEternity) {
        eternityResetRequest();
      }
    }
  }
};
</script>

<template>
  <img 
  class="syn-button-size"
  :src="`images/synergismUI/eternity.png`"
  v-on:click=handleClick />
</template>

<style scoped>

</style>
