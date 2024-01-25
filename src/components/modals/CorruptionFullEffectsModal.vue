<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "CorruptionFullEffectsModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  computed: {
    nerfs() {
      return [
        // Does this that hard? What on earth making you so arrogant that you could nerf player without telling them why? --sxy
        "Placeholder",
        `Placeholder with format number: ${format(Number.MAX_VALUE, 2)}`,
        `Placeholder with Precentage number: ${formatPercents(0.5)} as effective`,
        `Placeholder with Int number: ${formatInt(10)}`,
      ];
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      List of full nerf effects of specific Hostilities
    </template>
    <div class="pelle-effects-container">
      <p
        v-for="(nerf, idx) in nerfs"
        :key="idx"
      >
        {{ nerf }}
      </p>
    </div>
    <PrimaryButton
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="emitClose"
    >
      Okay
    </PrimaryButton>
  </ModalWrapper>
</template>

<style scoped>
.pelle-effects-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
