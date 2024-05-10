<template>
  <q-dialog v-model="canChipsBeSelected" persistent>
    <q-card>
      <q-card-section class="text-h6">
        <div>Choose the next chip</div>
      </q-card-section>

      <q-card-section>
        <div class="column items-center text-center">
          <div>
            You have drawn a blue chip! Click on a chip to place it next. Click
            on the cancel button if you don't like anything.
          </div>
          <div class="row q-pa-md items-center">
            <template v-for="(chip, index) in chipsToSelectFrom as Chip[]" :key="index">
              <ChipVisualization :chip="chip" @clicked="handleChipSelected(chip as Chip)" class="q-ma-sm" />
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
import { ref } from "vue";
import Chip from "./models/chip";
import Player from "./managers/player";
import ChipVisualization from "./chip/ChipVisualization.vue";
const player = defineModel<Player>({
  required: true,
});

const canChipsBeSelected = ref(false);
const chipsToSelectFrom = ref<Chip[]>([]);

function handleSpecialCases(chip: Chip) {
  if (chip.name == "mandrake") player.value.returnLastCherry();
  else if (chip.name == "skull") {
    const selection = player.value.bag.viewRandomChips(chip.value);

    if (selection == undefined)
      return;

    chipsToSelectFrom.value = selection;
    canChipsBeSelected.value = true;
  }
}

function handleChipSelected(chip: Chip | null) {
  canChipsBeSelected.value = false;
  if (chip != null) {
    player.value.bag.removeChip(chip);
    player.value.board.placeChip(chip);
    handleSpecialCases(chip);
  }
}

defineExpose({
  handleSpecialCases
})
</script>
