<template>
  <div class="column items-center q-pb-md">
    <template v-for="(group, index) in groupedItems" :key="index">
      <div class="row q-ma-sm">
        <template v-for="chip in group.items" :key="chip.name">
          <ChipUpdate v-if="chip.activeRound <= round" class="q-ma-xs" :show-number="true"
            v-model="chips[getElementIndex(chip)]"
            :allow-increment="!limitBuyingChoise || (!chip.boughtThisRound && boughtThisRound < 2)"
            :allow-decrement="chip.boughtThisRound" :allow-value-update="chip.name != 'cherry'"
            @incremented="handleIncremented" @decremented="handleDecremented" />
        </template>
      </div>
      <q-separator inset />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameChips from './gameChips';
import Chip from 'src/components/models/Chip/chip';
import ChipQuantity from './models/Chip/chipQuantity';
import { onMounted, ref } from 'vue';
import ChipUpdate from './chip/ChipUpdate.vue';

const chips = defineModel<ChipQuantity[]>({ required: true });
const boughtThisRound = ref(0);
const limitBuyingChoise = ref();

onMounted(() => {
  boughtThisRound.value = 0;
  limitBuyingChoise.value = props.limitBuying;
  changeBoughtStatus(undefined, false);
})

const props = defineProps({
  round: { type: Number, required: true },
  limitBuying: { type: Boolean, required: false, default: true }
})

const groupedItems = GameChips.groupChips(chips.value);

const getElementIndex = (chip: Chip) => {
  return chips.value.findIndex(item => item.name === chip.name && item.value == chip.value);
};

function handleIncremented(chip: ChipQuantity) {
  changeBoughtStatus(chip.name, true);
  boughtThisRound.value++;
}

function handleDecremented(chip: ChipQuantity) {
  changeBoughtStatus(chip.name, false);
  boughtThisRound.value--;
}

function changeBoughtStatus(name: string | undefined, status: boolean) {
  chips.value = chips.value.map(entry => {
    if (name == undefined || entry.name == name) {
      entry.boughtThisRound = status;
    }
    return entry;
  });
}
</script>
