import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import Chip from "src/models/chip";

export const useBoardStore = defineStore("board", () => {
  const drawnChips = useStorage("drawnChips", [] as Chip[]);

  function resetState() {
    reset();
  }

  function placeChip(chip: Chip) {
    drawnChips.value.push(chip);
  }

  function reset() {
    drawnChips.value = [];
  }

  function getCherrySum(): number {
    let sum = 0;
    drawnChips.value.forEach((chip) => {
      if (chip.name === "cherry") {
        sum += chip.value;
      }
    });
    return sum;
  }

  function removeLastChip() {
    return drawnChips.value.pop();
  }

  return {
    placeChip,
    reset,
    getCherrySum,
    removeLastChip,
    drawnChips,
    resetState,
  };
});
