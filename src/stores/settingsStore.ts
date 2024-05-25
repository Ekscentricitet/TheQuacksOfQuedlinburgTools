import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { watch } from "vue";
import { useQuasar } from "quasar";

export const useSettingsStore = defineStore("settings", () => {
  const isDarkTheme = useStorage("isDarkTheme", false, localStorage, {
    mergeDefaults: true,
  });

  const $q = useQuasar();

  watch(isDarkTheme, () => {
    console.log("here");
    $q.dark.set(isDarkTheme.value);
  });

  return { isDarkTheme };
});
