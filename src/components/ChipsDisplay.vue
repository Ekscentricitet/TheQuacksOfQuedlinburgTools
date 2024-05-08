<template>
  <template v-for="(group, index) in groupedItems" :key="index">
    <div class="row">
      <ChipComponent v-for="chip in group.items" :key="chip.name" v-model="chips[getElementIndex(chip)]" class="q-ma-xs"
        :show-number="showNumber" :allow-increment="allowIncrement" :allow-decrement="allowDecrement"
        :allow-value-update="allowValueUpdate" />
    </div>
  </template>
</template>

<script setup lang="ts">
import GameChips from './gameChips';
import Chip from 'src/components/models/Chip/chip';
import ChipComponent from './ChipComponent.vue';
import ChipQuantity from './models/Chip/chipQuantity';
import { ref } from 'vue';

const chips = defineModel<ChipQuantity[]>({ required: true });

const showNumber = ref(true);
const allowValueUpdate = ref(true);
const allowIncrement = ref(true);
const allowDecrement = ref(true);

const groupedItems = GameChips.groupChips(chips.value)

const getElementIndex = (chip: Chip) => {
  return chips.value.findIndex(item => item.name === chip.name && item.value == chip.value);
};
</script>
