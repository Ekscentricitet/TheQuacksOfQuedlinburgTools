<template>
  <div class="column items-center q-pa-sm">
    <div>
      <q-btn v-if="!areChipsOver || isResetAllowed" @click="draw" class="q-ma-xs">Draw</q-btn>
      <q-btn v-if="isResetAllowed" @click="reset" class="q-ma-xs">Reset</q-btn>
      <q-btn :disabled="!flaskAvailable" @click="useFlask" icon="mdi-flask"></q-btn>
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
import { useQuasar } from 'quasar';

const $q = useQuasar()
const flaskUsed = ref(false);
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
  flaskUsed.value = false;
}

function useFlask(){
  const lastChip = drawnChips.value.pop();

  if (lastChip?.name != 'cherry' && lastChip != null)
  {
    drawnChips.value.push(lastChip);
    showBadFlaskUsageDialog();
    return;
  }

  flaskUsed.value = true;

  const chipsInBag = playerChips.value
    .find(chip => chip.name == 'cherry' && chip.value == lastChip?.value);

  if (chipsInBag == null)
    return;

  chipsInBag.leftInBag += 1;
}

function showBadFlaskUsageDialog(){
  $q.dialog({
      title: 'Cannot use the flask',
      message: 'The last drawn token is not a cherry.',
      ok: {
        label: 'Poor me...',
      },
    })
}

const cherrySum = computed(() => {
  const drawnCherries = drawnChips.value
    .filter(chip => chip.name == 'cherry')
  let sum = 0;
  drawnCherries.forEach(cherry => sum += cherry.value);
  return sum;
})

const flaskAvailable = computed(() =>{
  return !flaskUsed.value && cherrySum.value > 7;
})
</script>

<style></style>
