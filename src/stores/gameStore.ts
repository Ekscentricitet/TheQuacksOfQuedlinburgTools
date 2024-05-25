import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useGameStore = defineStore("gameStore", () => {
  const round = useStorage("round", 1);
  const isBuyPhase = useStorage("isBuyPhase", false);
  const isCardPhase = useStorage("isCardPhase", false);
  const isDrawPhase = useStorage("isDrawPhase", true);

  function advanceState() {
    if (isBuyPhase.value) {
      isBuyPhase.value = false;
      isCardPhase.value = true;
    } else if (isCardPhase.value) {
      isCardPhase.value = false;
      isDrawPhase.value = true;
    } else {
      isDrawPhase.value = false;
      isBuyPhase.value = true;
    }
  }

  return { round, isBuyPhase, isCardPhase, isDrawPhase, advanceState };
});