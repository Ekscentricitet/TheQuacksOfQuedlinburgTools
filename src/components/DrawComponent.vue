<template>
  <q-card>
    <q-btn @click="draw">Draw</q-btn>
    <q-btn @click="reset">Reset</q-btn>
    <div v-if="drawnChips.length > 0">
      Drawn chips: <q-icon v-for="drawnChip in drawnChips" :key="drawnChip.name" :name="drawnChip.icon"
        :color="drawnChip.color"></q-icon>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import Chip from './models/chip';
import ChipUnit from './models/chipUnit';
import { ref } from 'vue';

const chips = defineModel<Chip[]>({
  required: true
});

const drawnChips = ref<ChipUnit[]>([]);

function draw() {
  const units = chips.value
    .filter(chip => chip.leftInBag > 0)
    .map(chip => ChipUnit.fromChip(chip));

  const newChip = getRandomChip(units);

  if (!newChip)
    return;

  drawnChips.value.push(newChip);

  const chipType = chips.value.find(chip => chip.name === newChip.name) as Chip;
  chipType.leftInBag -= 1;
}

function getRandomChip<ChipUnit>(chipsUnits: ChipUnit[]) {
  if (chipsUnits.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * chipsUnits.length);
  return chipsUnits[randomIndex];
}

function reset() {
  chips.value.map(chip => {
    chip.leftInBag = chip.currentNumber
  });
  drawnChips.value = [];
}
</script>

<style></style>
