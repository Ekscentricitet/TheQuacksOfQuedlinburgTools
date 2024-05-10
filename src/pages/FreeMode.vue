<template>
  <div class="column items-center">
    <ChipGrouper v-model="player.bag as Bag">
      <template v-slot="slotProps">
        <ChipIncrement
          v-model="slotProps.chip"
          class="q-ma-xs"
          :show-number="true"
          :allow-increment="true"
          :allow-decrement="true"
          :allow-value-update="true"
          @incremented="player.bag.buyChip(slotProps.chip)"
          @decremented="player.bag.sellChip(slotProps.chip)"
        />
      </template>
    </ChipGrouper>
    <DrawComponent v-model="player.bag as Bag"></DrawComponent>
  </div>
</template>

<script setup lang="ts">
import DrawComponent from "components/DrawComponent.vue";
import ChipGrouper from "src/components/chip/ChipGrouper.vue";
import { ref } from "vue";
import Player from "src/components/models/player";
import Bag from "src/components/models/bag";
import ChipIncrement from "src/components/chip/ChipIncrement.vue";

const player = ref<Player>(new Player());
</script>

<style></style>
