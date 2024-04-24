<script>
import KohlerMilestone from "./KohlerMilestone";

export default {
  name: "KohlerMilestoneRow",
  components: {
    KohlerMilestone
  },
  props: {
    row: {
      type: Array,
      required: true
    },
    isObscured: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isCompleted: false,
      isHidden: false
    };
  },
  computed: {
    classObject() {
      return {
        "l-achievement-grid__row": true,
        "c-achievement-grid__row--completed": this.isCompleted
      };
    }
  },
  methods: {
    update() {
      this.isCompleted = false;//this.row.every(a => a.isUnlocked);
      this.isHidden = false;//this.isCompleted && player.options.hideCompletedAchievementRows;
    }
  }
};
</script>

<template>
  <div
    v-if="!isHidden"
    :class="classObject"
  >
    <kohler-milestone
      v-for="(kohlerMilestone, i) in row"
      :key="i"
      :kohlerMilestone="kohlerMilestone"
      :is-obscured="isObscured"
      class="l-achievement-grid__cell"
    />
  </div>
</template>
