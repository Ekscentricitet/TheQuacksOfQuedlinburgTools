<template>
  <div class="column items-center q-pb-md">
    <template v-for="(group, index) in groupedItems" :key="index">
      <div class="row q-ma-sm">
        <slot v-for="chip in group.items" :key="chip.name" :chip="chip" />
      </div>
      <q-separator inset />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameChips from '../gameChips';
import Bag from '../models/bag';

const playerBag = defineModel<Bag>({ required: true });

const groupedItems = GameChips.groupChips(playerBag.value.chipsData);
</script>
