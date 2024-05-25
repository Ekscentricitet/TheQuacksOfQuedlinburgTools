<template>
  <q-toggle
    v-model="settingsStore.isDarkTheme"
    label="Dark Mode"
    color="primary"
  />
</template>

<script setup lang="ts">
import { useSettingsStore } from "stores/settingsStore";

const settingsStore = useSettingsStore();
</script>
