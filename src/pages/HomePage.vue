<template>
  <ChipComponent v-for="(chip, index) in chips" :key="index" v-model="chips[index]" />
  <DrawComponent v-model="chips"></DrawComponent>
</template>

<script setup lang="ts">
import ChipComponent from 'components/ChipComponent.vue'
import DrawComponent from 'components/DrawComponent.vue'
import { ref, onMounted } from 'vue';
import chipsData from 'assets/chips.json';
import Chip from 'components/models/chip';

const chips = ref<Chip[]>([]);

onMounted(() => {
  chips.value = Chip.fromDtos(chipsData);
});
</script>

<style></style>
