<template>
  <q-card>
    <q-icon :color="chip.color" :name="chip.icon" size="1.5em" />
    <q-icon :color="chip.color" :name="chip.numberIcon" size="1.5em" />
    <q-btn @click="decrement" dense flat icon="remove" size="10px" />
    {{ chip.currentNumber }}
    <q-btn @click="increment" dense flat icon="add" size="10px" />
  </q-card>
</template>

<script setup lang="ts">
import Chip from './models/chip';

const chip = defineModel<Chip>({
  required: true
});

const increment = () => {
  chip.value.currentNumber++;
  chip.value.leftInBag++;
};

const decrement = () => {
  if (chip.value.currentNumber > 0) {
    chip.value.currentNumber--;
    chip.value.leftInBag--;
  }
};
</script>

<style></style>
