<template>
  <q-dialog v-model="canChipsBeSelected" persistent>
    <q-card>
      <q-card-section class="text-h6">
        <div>Pick a chip</div>
      </q-card-section>

      <q-card-section>
        <div class="column items-center text-center">
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
import { PropType, onMounted, ref } from "vue";
import Player from "./managers/player";
import Chip from "./models/chip";
import ChipVisualization from "./chip/ChipVisualization.vue";

const props = defineProps({
  quantity: { type: Number, required: true },
  player: {
    type: Object as PropType<Player>,
    required: true,
  }
})

const canChipsBeSelected = defineModel({ type: Boolean, required: true });

const chipsToSelectFrom = ref<Chip[]>([]);

onMounted(() => {
  drawAndPick()
})

function drawAndPick() {
  const selection = props.player.bag.viewRandomChips(props.quantity);

  if (selection == undefined)
    return;

  chipsToSelectFrom.value = selection;
  canChipsBeSelected.value = true;
}

function handleChipSelected(chip: Chip | null) {
  canChipsBeSelected.value = false;
  if (chip != null) {
    props.player.bag.removeChip(chip);
    props.player.board.placeChip(chip);
  }
}
</script>
