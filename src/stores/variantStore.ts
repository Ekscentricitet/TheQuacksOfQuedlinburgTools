import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useGameVariantStore = defineStore("gameVariant", () => {
  const isVariantOne = useStorage("isVariantOne", false);

  function toggle() {
    isVariantOne.value = !isVariantOne.value;
  }

  return {
    isVariantOne,
    toggle,
  };
});
