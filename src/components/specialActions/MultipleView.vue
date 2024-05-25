<template>
  <div class="row">
    <q-btn @click="draw(4)">Draw 4 chips</q-btn>
    <q-btn @click="draw(5)">Draw 5 chips</q-btn>
  </div>

  <q-dialog v-model="areChipsShown" persistent>
    <q-card>
      <q-card-section>
        <template v-for="(chip, index) in chipsToSelectFrom as Chip[]" :key="index">
          <ChipVisualization :chip="chip" class="q-ma-md" :vertical="false" />
        </template>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="I am done!" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chip from "../../models/chip";
import ChipVisualization from "src/components/chip/ChipVisualization.vue";
import { usePlayerStore } from "src/stores/playerStore";

const player = usePlayerStore();

const areChipsShown = ref(false);
const chipsToSelectFrom = ref<Chip[]>([]);

function draw(quantity: number) {
  chipsToSelectFrom.value = player.bag.viewRandomChips(quantity) ?? [];
  areChipsShown.value = true;
}
</script>
