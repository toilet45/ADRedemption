<script>
export default {
  name: "EnterCelestialsRaPet",
  props: {
    petId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      isUnlocked: false,
    };
  },
  computed: {
    pet() {
      return Ra.pets.all[this.petId];
    },
    name() {
      return this.pet.name;
    },
    color() {
      return `color: ${this.pet.color}`;
    },
    gainText() {
      // We need to special-case the grammar for Nameless
      const isPlural = this.pet.id === "enslaved";
      const gain = isPlural ? "gain" : "gains";
      const has = isPlural ? "have" : "has";
      const gainText = this.pet.id === "pelle"? "only gains Memory Chunks in a Doomed Reality" : `${gain} Memory Chunks based on ${this.chunkGain}`;
      return this.pet.level === (MendingUpgrade(19).isBought?100:25)
        ? `${has} regained all Memories`
        : gainText;
    },
    chunkGain() {
      return this.pet.chunkGain;
    },
  },
  methods: {
    update() {
      this.isUnlocked = this.pet.isUnlocked;
    }
  },
};
</script>

<template>
  <span
    v-if="isUnlocked"
    :style="color"
  >
    {{ name }} {{ gainText }}.
    <br>
  </span>
</template>
