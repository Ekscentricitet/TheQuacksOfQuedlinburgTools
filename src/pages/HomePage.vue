<template>
  <template v-for="(group, index) in groupedItems" :key="index">
    <div class="row">
      <ChipComponent v-for="chip in group.items" :key="chip.name" v-model="chips[getElementIndex(chip)]"
        class="q-ma-xs" />
    </div>
  </template>
  <DrawComponent v-model="chips"></DrawComponent>
</template>

<script setup lang="ts">
import ChipComponent from 'components/ChipComponent.vue'
import DrawComponent from 'components/DrawComponent.vue'
import { ref, onMounted, computed } from 'vue';
import chipsData from 'assets/chips.json';
import Chip from 'components/models/chip';

const chips = ref<Chip[]>([]);

onMounted(() => {
  chips.value = Chip.fromDtos(chipsData);
});

const groupedItems = computed(() => {
  const groups: Record<string, Chip[]> = {};
  chips.value.forEach(chip => {
    const name = chip.name;
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(chip);
  });
  return Object.keys(groups).map(name => ({
    name,
    items: groups[name],
  }));
});

const getElementIndex = (chip: Chip) => {
  return chips.value.findIndex(item => item.name === chip.name && item.value == chip.value);
};
</script>

<style></style>
