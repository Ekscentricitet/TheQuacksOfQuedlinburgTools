<template>
  <ChipGrouper>
    <template v-slot="slotProps">
      <ChipIncrement v-if="slotProps.chip.activeRound <= game.round" class="q-ma-xs" :show-number="true"
        v-model="slotProps.chip" :allow-increment="isIncrementAllowed(slotProps.chip)"
        :allow-decrement="slotProps.chip.boughtThisRound || !limitBuying" :allow-value-update="slotProps.chip.name != 'cherry' ||
          (slotProps.chip.value == 1 && !limitBuying)
          " @incremented="player.bag.buyChip(slotProps.chip)" @decremented="player.bag.sellChip(slotProps.chip)" />
    </template>
  </ChipGrouper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePlayerStore } from "src/stores/playerStore";
import { useGameStore } from "src/stores/gameStore";
import ChipQuantity from "src/models/chipQuantity";
import ChipIncrement from "./chip/ChipIncrement.vue";
import ChipGrouper from "./chip/ChipGrouper.vue";

const props = defineProps({
  limitBuying: { type: Boolean, required: false, default: true },
});

const player = usePlayerStore();
const game = useGameStore();
const limitBuyingChoise = ref(props.limitBuying);

onMounted(() => {
  player.prepareForNewPhase();
});

function isIncrementAllowed(chip: ChipQuantity) {
  return (
    !limitBuyingChoise.value ||
    (!chip.boughtThisRound && player.bag.chipsBoughtThisRound < 2)
  );
}
</script>
