<template>
  <div class="column items-center q-pa-sm">
    <div>
      <q-btn v-if="!areChipsOver || isResetAllowed" @click="draw" class="q-ma-xs">Draw</q-btn>
      <q-btn v-if="isResetAllowed" @click="reset" class="q-ma-xs">Reset</q-btn>
    </div>
    <div class="q-pa-md">
      <q-chip>Cherry Sum: {{ cherrySum }}</q-chip>
      <q-chip v-for="drawnChip in drawnChips" :key="drawnChip.name" color="grey-2">
        <q-icon :name="drawnChip.icon" :color="drawnChip.color" />
        <q-icon :name="drawnChip.numberIcon" :color="drawnChip.color" />
      </q-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chip from './models/Chip/chip';
import { computed, onMounted, ref } from 'vue';
import ChipQuantity from './models/Chip/chipQuantity';

const playerChips = defineModel<ChipQuantity[]>({
  required: true
});

defineProps({
  isResetAllowed: { type: Boolean, default: true }
})

const drawnChips = ref<Chip[]>([]);
const areChipsOver = ref(false);

onMounted(() => {
  reset();
})

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
  if (chipsUnits.length === 0) {
    areChipsOver.value = true;
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * chipsUnits.length);
  return chipsUnits[randomIndex];
}

function reset() {
  playerChips.value.map(chip => {
    chip.leftInBag = chip.quantity
  });
  drawnChips.value = [];
}

const cherrySum = computed(() => {
  const drawnCherries = drawnChips.value
    .filter(chip => chip.name == 'cherry')
  let sum = 0;
  drawnCherries.forEach(cherry => sum += cherry.value);
  return sum;
})
</script>

<style></style>
