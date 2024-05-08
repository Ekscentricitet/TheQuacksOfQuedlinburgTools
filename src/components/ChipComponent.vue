<template>
  <q-card>
    <div class="row items-center">
      <div class="column">
        <q-icon :color="chip.color" :name="chip.icon" size="3.5vh" />
        <q-icon :color="chip.color" :name="chip.numberIcon" size="3.5vh" />
      </div>
      <div v-if="showNumber" class="row">
        <q-btn v-if="allowValueUpdate" :disabled="!allowDecrement" @click="decrement" dense flat icon="remove"
          size="1.5vh" />
        <q-chip size="1.5vh">{{ chip.quantity }}</q-chip>
        <q-btn v-if="allowValueUpdate" :disabled="!allowIncrement" @click="increment" dense flat icon="add"
          size="1.5vh" />
      </div>
    </div>

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

const emits = defineEmits(['incremented', 'decremented']);

const increment = () => {
  chip.value.quantity++;
  chip.value.leftInBag++;
  chip.value.boughtThisRound = true;
  emits('incremented');
};

const decrement = () => {
  if (chip.value.quantity > 0) {
    chip.value.quantity--;
    chip.value.leftInBag--;
    chip.value.boughtThisRound = false;
    emits('decremented');
  }
};
</script>

<style></style>
