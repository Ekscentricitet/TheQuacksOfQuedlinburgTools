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
      <MultipleView v-model="player" />
      <SpecialActionsDrawer v-model="player"></SpecialActionsDrawer>
    </div>
    <DrawComponent></DrawComponent>
  </div>
</template>

<script setup lang="ts">
import ChipGrouper from "src/components/chip/ChipGrouper.vue";
import ChipIncrement from "src/components/chip/ChipIncrement.vue";
import MultipleView from "src/components/specialActions/MultipleView.vue";
import SpecialActionsDrawer from "src/components/specialActions/SpecialActionsDrawer.vue";
import { usePlayerStore } from "src/stores/playerStore";
import DrawComponent from "src/components/DrawComponent.vue";

const player = usePlayerStore();
</script>

<style></style>
