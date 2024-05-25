<template>
  <ChipGrouper>
    <template v-slot="slotProps">
      <ChipIncrement v-if="slotProps.chip.activeRound <= gameStore.round" class="q-ma-xs" :show-number="true"
        v-model="slotProps.chip" :allow-increment="isIncrementAllowed(slotProps.chip)"
        :allow-decrement="slotProps.chip.boughtThisRound || !limitBuying"
        :allow-value-update="slotProps.chip.name != 'cherry' || (slotProps.chip.value == 1 && !limitBuying)"
        @incremented="playerStore.bag.buyChip(slotProps.chip)"
        @decremented="playerStore.bag.sellChip(slotProps.chip)" />
    </template>
  </ChipGrouper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChipIncrement from "./chip/ChipIncrement.vue";
import ChipGrouper from "./chip/ChipGrouper.vue";
import ChipQuantity from "./models/chipQuantity";
import { usePlayerStore } from "src/stores/playerStore";
import { useGameStore } from "src/stores/gameStore";

const props = defineProps({
  limitBuying: { type: Boolean, required: false, default: true },
});

const playerStore = usePlayerStore();
const gameStore = useGameStore();
const limitBuyingChoise = ref(props.limitBuying);

onMounted(() => {
  playerStore.prepareForNewPhase();
});

function isIncrementAllowed(chip: ChipQuantity) {
  return (
    !limitBuyingChoise.value ||
    (!chip.boughtThisRound && playerStore.bag.chipsBoughtThisRound < 2)
  );
}
</script>
