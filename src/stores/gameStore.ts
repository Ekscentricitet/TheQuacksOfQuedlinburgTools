import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { usePlayerStore } from "./playerStore";

export const useGameStore = defineStore("gameStore", () => {
  const round = useStorage("round", 1);
  const isBuyPhase = useStorage("isBuyPhase", false);
  const isCardPhase = useStorage("isCardPhase", false);
  const isDrawPhase = useStorage("isDrawPhase", true);
  const player = usePlayerStore();

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

  function resetGame() {
    round.value = null;
    isBuyPhase.value = null;
    isCardPhase.value = null;
    isDrawPhase.value = null;
    player.resetState();
  }

  return {
    round,
    isBuyPhase,
    isCardPhase,
    isDrawPhase,
    advanceState,
    resetGame,
  };
});
