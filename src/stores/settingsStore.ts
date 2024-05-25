import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { watch } from "vue";
import { useQuasar } from "quasar";

export const useSettingsStore = defineStore("settings", () => {
  const isDarkTheme = useStorage("isDarkTheme", false);
  const $q = useQuasar();
  $q.dark.set(isDarkTheme.value);

  watch(isDarkTheme, () => {
    $q.dark.set(isDarkTheme.value);
  });

  return { isDarkTheme };
});
