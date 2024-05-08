<template>
  <q-card>
    <q-icon :color="chip.color" :name="chip.icon" size="1.5em" />
    <q-icon :color="chip.color" :name="chip.numberIcon" size="1.5em" />
    <row v-if="showNumber">
      <q-btn v-if="allowValueUpdate" :disabled="!allowDecrement" @click="decrement" dense flat icon="remove"
        size="10px" />
      <q-chip>{{ chip.quantity }}</q-chip>
      <q-btn v-if="allowValueUpdate" :disabled="!allowIncrement" @click="increment" dense flat icon="add" size="10px" />
    </row>
  </q-card>
</template>

<script setup lang="ts">
import ChipQuantity from './models/Chip/chipQuantity';

const chip = defineModel<ChipQuantity>({
  required: true
});

defineProps({
  showNumber: Boolean,
  allowValueUpdate: Boolean,
  allowIncrement: Boolean,
  allowDecrement: Boolean,
})

const increment = () => {
  chip.value.quantity++;
  chip.value.leftInBag++;
};

const decrement = () => {
  if (chip.value.quantity > 0) {
    chip.value.quantity--;
    chip.value.leftInBag--;
  }
};
</script>

<style></style>
