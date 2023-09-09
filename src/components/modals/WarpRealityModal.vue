<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "WarpRealityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const endAM = format(Decimal.MAX_VALUE, 2, 2);
      return `Warping will allow you to gain antimatter past ${endAM}
        However, many mechanics will be nerfed after ${endAM} antimatter.
        You will gain additional Multiversal Remains based on antimatter produced over ${endAM}.`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      warpReality();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      You are Warping Reality
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      WARP!!
    </template>
  </ModalWrapperChoice>
</template>
