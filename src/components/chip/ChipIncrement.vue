<template>
  <ChipVisualization :vertical="true" :chip="chip as Chip">
    <div v-if="showNumber" class="row">
      <q-btn v-if="allowValueUpdate" :disabled="!allowDecrement" @click="decrement" dense flat icon="remove"
        size="1vh" />
      <q-chip size="1.5vh">{{ chip.quantity }} </q-chip>
      <q-btn v-if="allowValueUpdate" :disabled="!allowIncrement" @click="increment" dense flat icon="add" size="1vh" />
    </div>
  </ChipVisualization>
</template>

<script setup lang="ts">
import ChipVisualization from "./ChipVisualization.vue";
import ChipQuantity from "../models/chipQuantity";
import Chip from "../models/chip";

const chip = defineModel<ChipQuantity>({
  required: true,
});

defineProps({
  showNumber: Boolean,
  allowValueUpdate: Boolean,
  allowIncrement: Boolean,
  allowDecrement: Boolean,
});

const emits = defineEmits(["incremented", "decremented"]);

const increment = () => {
  emits("incremented", chip.value);
};

const decrement = () => {
  if (chip.value.quantity > 0) {
    emits("decremented", chip.value);
  }
};
</script>

<style></style>
