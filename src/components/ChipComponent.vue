<template>
    <q-card>
        <q-chip :color="chip.name" text-color="white">{{ chip.fullName }}</q-chip>
    </q-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Chip from './models/chip';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    chip: {
        type: Chip,
        required: true
    }
});
</script>

<style></style>