<template>
  <template v-for="(group, index) in groupedItems" :key="index">
    <div class="row">
      <ChipComponent v-for="chip in group.items" :key="chip.name" v-model="chips[getElementIndex(chip)]"
        class="q-ma-xs" />
    </div>
  </template>
</template>

<script setup lang="ts">
import GameChips from './gameChips';
import Chip from 'components/models/chip';
import ChipComponent from './ChipComponent.vue';
import ChipQuantity from './models/chipQuantity';

const chips = defineModel<ChipQuantity[]>({ required: true });

const groupedItems = GameChips.groupChips(chips.value)

const getElementIndex = (chip: Chip) => {
  return chips.value.findIndex(item => item.name === chip.name && item.value == chip.value);
};
</script>
