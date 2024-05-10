<template>
  <q-toggle
    v-model="gameVariantStore.isVariantOne"
    @input="gameVariantStore.toggle"
    label="Play Variant I"
  />
</template>

<script setup lang="ts">
import { useGameVariantStore } from "stores/variantStore";

const gameVariantStore = useGameVariantStore();
</script>
