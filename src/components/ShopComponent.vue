<template>
  <div class="column items-center q-pb-md">
    <template v-for="(group, index) in groupedItems" :key="index">
      <div class="row q-ma-sm">
        <template v-for="chip in group.items" :key="chip.name">
          <ChipComponent v-if="chip.activeRound <= round" class="q-ma-xs" :show-number="true"
            v-model="chips[getElementIndex(chip)]" :allow-increment="!chip.boughtThisRound && boughtThisRound < 2"
            :allow-decrement="chip.boughtThisRound" :allow-value-update="chip.name != 'cherry'"
            @incremented="boughtThisRound++" @decremented="boughtThisRound--" />
        </template>
      </div>
      <q-separator inset />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameChips from './gameChips';
import Chip from 'src/components/models/Chip/chip';
import ChipComponent from './ChipComponent.vue';
import ChipQuantity from './models/Chip/chipQuantity';
import { onMounted, ref } from 'vue';

const chips = defineModel<ChipQuantity[]>({ required: true });
const boughtThisRound = ref(0);

onMounted(() => {
  boughtThisRound.value = 0;
})

defineProps({
  round: { type: Number, required: true }
})

const groupedItems = GameChips.groupChips(chips.value);

const getElementIndex = (chip: Chip) => {
  return chips.value.findIndex(item => item.name === chip.name && item.value == chip.value);
};
</script>
