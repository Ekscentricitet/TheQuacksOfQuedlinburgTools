<template>
  <div class="column items-center q-pa-sm">
    <div>
      <q-btn v-if="!areChipsOver || isResetAllowed" @click="draw" class="q-ma-xs">Draw</q-btn>
      <q-btn v-if="isResetAllowed" @click="player.prepareForNewPhase()" class="q-ma-xs">Reset</q-btn>
      <q-btn :disabled="!player.isFlaskAvailable" @click="useFlask" icon="mdi-flask"></q-btn>
    </div>
    <div class="row">
      <q-chip>Cherry Sum: {{ player.board.getCherrySum() }}</q-chip>
      <ChipVisualization v-for="drawnChip in player.board.drawnChips" class="q-ma-sm" :chip="drawnChip as Chip"
        :vertical="true" :key="drawnChip.name" />
    </div>
  </div>
  <DrawVariation ref="variant" v-if="isVariantOne"></DrawVariation>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useGameVariantStore } from "src/stores/variantStore";
import ChipVisualization from "./chip/ChipVisualization.vue";
import DrawVariation from "./DrawVariation.vue";
import { usePlayerStore } from "src/stores/playerStore";
import Chip from "./models/chip";

const $q = useQuasar();
const player = usePlayerStore();

defineProps({
  isResetAllowed: { type: Boolean, default: true },
});

const areChipsOver = ref(false);
const gameVarriantStore = useGameVariantStore();
const isVariantOne = computed(() => gameVarriantStore.isVariantOne);
const variant = ref();

onMounted(() => {
  player.prepareForNewPhase();
});

function draw() {
  const drawnChip = player.drawChip();
  if (!drawnChip) return;

  player.board.placeChip(drawnChip);

  if (isVariantOne.value) variant.value.handleSpecialCases(drawnChip);
}

function useFlask() {
  const wasFlaskUsed = player.useFlask();
  if (!wasFlaskUsed)
    showBadFlaskUsageDialog();
}

function showBadFlaskUsageDialog() {
  $q.dialog({
    title: "Cannot use the flask",
    message: "The last drawn token is not a cherry.",
    ok: {
      label: "Poor me...",
    },
  });
}
</script>

<style></style>
