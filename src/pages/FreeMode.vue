<template>
  <div class="column items-center">
    <ChipGrouper>
      <template v-slot="slotProps">
        <ChipIncrement v-model="slotProps.chip" class="q-ma-xs" :show-number="true" :allow-increment="true"
          :allow-decrement="true" :allow-value-update="true" @incremented="player.bag.buyChip(slotProps.chip)"
          @decremented="player.bag.sellChip(slotProps.chip)" />
      </template>
    </ChipGrouper>
    <div class="row">
      <MultipleChipsView v-model="player" />
      <SpecialActionsDrawer v-model="player"></SpecialActionsDrawer>
    </div>
    <DrawComponent></DrawComponent>
  </div>
</template>

<script setup lang="ts">
import DrawComponent from "components/DrawComponent.vue";
import ChipGrouper from "src/components/chip/ChipGrouper.vue";
import ChipIncrement from "src/components/chip/ChipIncrement.vue";
import MultipleChipsView from "src/components/MultipleChipsView.vue";
import SpecialActionsDrawer from "src/components/SpecialActionsDrawer.vue";
import { usePlayerStore } from "src/stores/playerStore";

const player = usePlayerStore();
</script>

<style></style>
