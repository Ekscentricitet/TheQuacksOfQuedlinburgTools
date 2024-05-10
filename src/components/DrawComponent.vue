<template>
  <div class="column items-center q-pa-sm">
    <div>
      <q-btn v-if="!areChipsOver || isResetAllowed" @click="draw" class="q-ma-xs">Draw</q-btn>
      <q-btn v-if="isResetAllowed" @click="player.prepareForNewPhase()" class="q-ma-xs">Reset</q-btn>
      <q-btn :disabled="!player.isFlaskAvailable" @click="useFlask" icon="mdi-flask"></q-btn>
    </div>
    <div class="row">
      <q-chip>Cherry Sum: {{ player.board.getCherrySum() }}</q-chip>
      <ChipVisualization v-for="drawnChip in player.board.drawnChips" class="q-ma-sm" :chip="drawnChip" :vertical="true"
        :key="drawnChip.name" />
    </div>
  </div>
  <VariantOne ref="variant" v-if="isVariantOne" v-model="player as Player"></VariantOne>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useGameVariantStore } from "src/stores/variantStore";
import ChipVisualization from "./chip/ChipVisualization.vue";
import Player from "./managers/player";
import VariantOne from "./VariantOne.vue";

const $q = useQuasar();
const player = defineModel<Player>({
  required: true,
});

defineProps({
  isResetAllowed: { type: Boolean, default: true },
});

const areChipsOver = ref(false);
const gameVarriantStore = useGameVariantStore();
const isVariantOne = computed(() => gameVarriantStore.isVariantOne);
const variant = ref();

onMounted(() => {
  player.value.prepareForNewPhase();
});

function draw() {
  const drawnChip = player.value.drawChip();
  if (!drawnChip) return;

  player.value.board.placeChip(drawnChip);

  if (isVariantOne.value) variant.value.handleSpecialCases(drawnChip);
}

function useFlask() {
  const wasFlaskUsed = player.value.useFlask();
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
