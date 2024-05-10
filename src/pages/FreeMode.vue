<template>
  <div class="column items-center">
    <ChipGrouper v-model="player.bag as unknown as Bag">
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
    <DrawComponent v-model="player as unknown as Player"></DrawComponent>
  </div>
</template>

<script setup lang="ts">
import DrawComponent from "components/DrawComponent.vue";
import ChipGrouper from "src/components/chip/ChipGrouper.vue";
import { ref } from "vue";
import Player from "src/components/managers/player";
import Bag from "src/components/managers/bag";
import ChipIncrement from "src/components/chip/ChipIncrement.vue";
import MultipleChipsView from "src/components/MultipleChipsView.vue";
import SpecialActionsDrawer from "src/components/SpecialActionsDrawer.vue";

const player = ref<Player>(new Player());
</script>

<style></style>
