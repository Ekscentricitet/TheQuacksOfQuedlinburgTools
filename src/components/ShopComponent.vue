<template>
  <ChipGrouper v-model="playerBag as Bag">
    <template v-slot="slotProps">
      <ChipIncrement v-if="slotProps.chip.activeRound <= round" class="q-ma-xs" :show-number="true"
        v-model="slotProps.chip" :allow-increment="isIncrementAllowed(slotProps.chip)"
        :allow-decrement="slotProps.chip.boughtThisRound" :allow-value-update="slotProps.chip.name != 'cherry'"
        @incremented="playerBag.buyChip(slotProps.chip)" @decremented="playerBag.sellChip(slotProps.chip)" />
    </template>
  </ChipGrouper>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChipIncrement from './chip/ChipIncrement.vue';
import Bag from './models/bag';
import ChipGrouper from './chip/ChipGrouper.vue';
import ChipQuantity from './models/chip/chipQuantity';

const playerBag = defineModel<Bag>({ required: true });
const boughtThisRound = ref(0);
const limitBuyingChoise = ref();

onMounted(() => {
  boughtThisRound.value = 0;
  limitBuyingChoise.value = props.limitBuying;
  playerBag.value.reset();
})

const props = defineProps({
  round: { type: Number, required: true },
  limitBuying: { type: Boolean, required: false, default: true }
})

function isIncrementAllowed(chip: ChipQuantity) {
  return !limitBuyingChoise.value || (!chip.boughtThisRound && playerBag.value.chipsBoughtThisRound < 2)
}

</script>
