<template>
  <ChipGrouper v-model="player.bag as Bag">
    <template v-slot="slotProps">
      <ChipIncrement v-if="slotProps.chip.activeRound <= round" class="q-ma-xs" :show-number="true"
        v-model="slotProps.chip" :allow-increment="isIncrementAllowed(slotProps.chip)"
        :allow-decrement="slotProps.chip.boughtThisRound || !limitBuying"
        :allow-value-update="slotProps.chip.name != 'cherry' || (slotProps.chip.value == 1 && !limitBuying)"
        @incremented="player.bag.buyChip(slotProps.chip)" @decremented="player.bag.sellChip(slotProps.chip)" />
    </template>
  </ChipGrouper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChipIncrement from "./chip/ChipIncrement.vue";
import Bag from "./managers/bag";
import ChipGrouper from "./chip/ChipGrouper.vue";
import ChipQuantity from "./models/chipQuantity";
import Player from "./managers/player";

const props = defineProps({
  round: { type: Number, required: true },
  limitBuying: { type: Boolean, required: false, default: true },
});

const player = defineModel<Player>({ required: true });
const limitBuyingChoise = ref(props.limitBuying);

onMounted(() => {
  player.value.prepareForNewPhase();
});

function isIncrementAllowed(chip: ChipQuantity) {
  return (
    !limitBuyingChoise.value ||
    (!chip.boughtThisRound && player.value.bag.chipsBoughtThisRound < 2)
  );
}
</script>
