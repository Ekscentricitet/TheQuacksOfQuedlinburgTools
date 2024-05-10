<template>
  <q-card @click="emits('clicked')">
    <div class="row items-center">
      <div :class="vertical">
        <q-icon :color="chip.color" :name="chip.icon" size="3vh" />
        <q-icon :color="chip.color" :name="chip.numberIcon" size="3vh" />
      </div>
      <slot />
    </div>
  </q-card>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import Chip from '../models/chip/chip';

const emits = defineEmits(['clicked']);

const props = defineProps({
  chip: { type: Chip, required: true },
  vertical: { type: Boolean, default: true },
  size: { default: '3vh' }
})

const vertical = computed(() => {
  if (props.vertical)
    return 'column';
  return 'row';
})
</script>

<style></style>
