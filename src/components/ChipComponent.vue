<template>
    <q-card>
        <q-icon :color="chip.color" :name="chip.icon" size="3em">
        </q-icon>
        <q-btn @click="decrement" dense flat icon="remove" />
        {{ chip.currentNumber }}
        <q-btn @click="increment" dense flat icon="add" />
    </q-card>
</template>

<script setup lang="ts">
import Chip from './models/chip';

const chip = defineModel<Chip>({
    required: true
});

const increment = () => {
    chip.value.currentNumber++;
};

const decrement = () => {
    if (chip.value.currentNumber > 0) {
        chip.value.currentNumber--;
    }
};
</script>

<style></style>