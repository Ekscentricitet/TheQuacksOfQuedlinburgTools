<template>
  <div class="column items-center">
    <div>
      <q-btn @click="draw" class="q-ma-xs">Draw</q-btn>
      <q-btn @click="reset" class="q-ma-xs">Reset</q-btn>
    </div>
    <div v-if="drawnChips.length > 0" class="q-pa-md">
      <q-chip v-for="drawnChip in drawnChips" :key="drawnChip.name" color="grey-2">
        <q-icon :name="drawnChip.icon" :color="drawnChip.color" />
        <q-icon :name="drawnChip.numberIcon" :color="drawnChip.color" />
      </q-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chip from './models/Chip/chip';
import { ref } from 'vue';
import ChipQuantity from './models/Chip/chipQuantity';

const playerChips = defineModel<ChipQuantity[]>({
  required: true
});

const drawnChips = ref<Chip[]>([]);

function draw() {
  const chips = playerChips.value
    .filter(chip => chip.leftInBag > 0)
    .flatMap(chip => {
      const numberOfObjects = chip.leftInBag;
      return Array.from({ length: numberOfObjects }, () => chip as Chip);
    });

  const drawnChip = getRandomChip(chips);

  if (!drawnChip)
    return;

  drawnChips.value.push(drawnChip);

  const chipType = playerChips.value.find(chip => chip.name === drawnChip.name && chip.value == drawnChip.value) as ChipQuantity;
  chipType.leftInBag -= 1;
}

function getRandomChip<ChipUnit>(chipsUnits: ChipUnit[]) {
  if (chipsUnits.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * chipsUnits.length);
  return chipsUnits[randomIndex];
}

function reset() {
  playerChips.value.map(chip => {
    chip.leftInBag = chip.quantity
  });
  drawnChips.value = [];
}
</script>

<style></style>
