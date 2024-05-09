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
  <q-dialog v-model="canChipsBeSelected" persistent>
    <q-card>
      <q-card-section class="text-h6">
        <div>Choose the next chip</div>
      </q-card-section>

      <q-card-section>
        <div class="column items-center text-center">
          <div>
            You have drawn a blue chip! Click on a chip to place it next. Click on the cancel button if you don't like
            anything.
          </div>
          <div class="row q-pa-md items-center">
            <template v-for="chip, index in chipsToSelectFrom" :key="index">
              <ChipComponent class="q-ma-md"
                v-model="chipsToSelectFrom[chipsToSelectFrom.indexOf(chip)] as unknown as ChipQuantity"
                @clicked="handleChipSelected(chip as Chip)" />
            </template>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="I don't like anything..." color="primary" @click="handleChipSelected(null)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Chip from './models/Chip/chip';
import { computed, onMounted, ref } from 'vue';
import ChipQuantity from './models/Chip/chipQuantity';
import { useQuasar } from 'quasar';
import { useGameVariantStore } from 'src/stores/variantStore';
import ChipComponent from './ChipComponent.vue';
import Bag from './models/bag';

const $q = useQuasar()
const flaskUsed = ref(false);
const playerBag = defineModel<Bag>({
  required: true
});

defineProps({
  isResetAllowed: { type: Boolean, default: true }
})

const drawnChips = ref<Chip[]>([]);
const areChipsOver = ref(false);
const gameVarriantStore = useGameVariantStore();
const isVariantOne = computed(() => gameVarriantStore.isVariantOne);

const canChipsBeSelected = ref(false);
const chipsToSelectFrom = ref<Chip[]>([]);

onMounted(() => {
  reset();
})

function draw() {
  const drawnChip = playerBag.value.getRandomChip();

  if (!drawnChip) {
    areChipsOver.value = true;
    return;
  }

  placeChip(drawnChip);
}

function placeChip(chip: Chip) {
  if (isVariantOne.value && chip.name == 'mandrake')
    returnLastCherry();

  drawnChips.value.push(chip);
  playerBag.value.removeChipFromBag(chip);

  if (isVariantOne.value && chip.name == 'skull') {
    console.log(chip);
    const selection = playerBag.value.drawRandomChips(chip.value);

    if (selection == undefined) {
      areChipsOver.value = true;
      return;
    }

    chipsToSelectFrom.value = selection;
    canChipsBeSelected.value = true;
  }
}

function reset() {
  playerBag.value.reset();
  drawnChips.value = [];
  flaskUsed.value = false;
}

function handleChipSelected(chip: Chip | null) {
  canChipsBeSelected.value = false;
  if (chip != null) {
    chipsToSelectFrom.value = [];
    playerBag.value.removeChipFromBag(chip);
    placeChip(chip);
  }
}

function useFlask() {
  const isReturnSuccessful = returnLastCherry();
  if (isReturnSuccessful)
    showBadFlaskUsageDialog();
  flaskUsed.value = true;
}

function returnLastCherry() {
  const lastChip = drawnChips.value.pop();

  if (lastChip?.name != 'cherry' && lastChip != null) {
    drawnChips.value.push(lastChip);
    return false;
  }

  const cherryInBag = playerBag.value.chipsData
    .find(chip => chip.name == 'cherry' && chip.value == lastChip?.value);

  if (cherryInBag == null)
    return false;

  cherryInBag.leftInBag += 1;
}

function showBadFlaskUsageDialog() {
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

const flaskAvailable = computed(() => {
  return !flaskUsed.value && cherrySum.value > 7;
})
</script>

<style></style>
