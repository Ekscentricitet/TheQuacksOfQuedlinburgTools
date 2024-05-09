<template>
  <q-toggle v-model="currentTheme" label="Dark Mode" color="primary" @update:model-value="toggleTheme" />
</template>

<script setup>
import { useSettingsStore } from 'stores/settingsStore';
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'

const settingsStore = useSettingsStore();
const $q = useQuasar()
const currentTheme = ref();

function toggleTheme() {
  settingsStore.setTheme(currentTheme.value);
  $q.dark.set(currentTheme.value)
}

onMounted(() => {
  settingsStore.loadTheme();
  $q.dark.set(settingsStore.darkTheme);
  currentTheme.value = settingsStore.darkTheme;
})
</script>
