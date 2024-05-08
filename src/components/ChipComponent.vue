<template>
  <q-card>
    <q-icon :color="chip.color" :name="chip.icon" size="1.5em" />
    <q-icon :color="chip.color" :name="chip.numberIcon" size="1.5em" />
    <q-btn @click="decrement" dense flat icon="remove" size="10px" />
    {{ chip.quantity }}
    <q-btn @click="increment" dense flat icon="add" size="10px" />
  </q-card>
</template>

<script setup lang="ts">
import ChipQuantity from 'components/models/chipQuantity';

const chip = defineModel<ChipQuantity>({
  required: true
});

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
