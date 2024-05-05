<template>
    <ChipComponent v-for="(chip, index) in chips" :key="index" :chip="chip" />
</template>

<script setup lang="ts">
import ChipComponent from 'components/ChipComponent.vue'
import { ref, onMounted } from 'vue';
import chipsData from 'assets/chips.json';
import Chip from 'components/models/chip';

const chips = ref<Chip[]>();

onMounted(() => {
    chips.value = chipsData;
});
</script>

<style></style>