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
import { useBagStore } from "src/stores/bagStore";
import GameChips from "../../managers/gameChips";
import ChipQuantity from "../../models/chipQuantity";

const playerBag = useBagStore();
const groupedItems = GameChips.groupChips(
  playerBag.chipsData as ChipQuantity[]
);
</script>
