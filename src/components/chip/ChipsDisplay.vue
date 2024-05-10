<template>
  <div class="column items-start q-pb-md">
    <template v-for="(group, index) in groupedItems" :key="index">
      <div class="row q-ma-sm">
        <ChipUpdate v-for="chip in group.items" :key="chip.name" v-model="playerBag.chipsData[getElementIndex(chip)]"
          class="q-ma-xs" :show-number="showNumber" :allow-increment="allowIncrement" :allow-decrement="allowDecrement"
          :allow-value-update="allowValueUpdate" />
      </div>
      <q-separator inset />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameChips from '../gameChips';
import { ref } from 'vue';
import Bag from '../models/bag';
import ChipUpdate from './ChipUpdate.vue';
import ChipQuantity from '../models/Chip/chipQuantity';

const playerBag = defineModel<Bag>({ required: true });

const showNumber = ref(true);
const allowValueUpdate = ref(true);
const allowIncrement = ref(true);
const allowDecrement = ref(true);

const groupedItems = GameChips.groupChips(playerBag.value.chipsData)

const getElementIndex = (chip: ChipQuantity) => {
  return playerBag.value.chipsData.findIndex(item => item.name === chip.name && item.value == chip.value);
};
</script>
