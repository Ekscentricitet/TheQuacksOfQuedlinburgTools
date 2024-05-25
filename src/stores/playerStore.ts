import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useBagStore } from "./bagStore";
import { useBoardStore } from "./boardStore";
import Chip from "src/models/chip";

export const usePlayerStore = defineStore("playerStore", () => {
  const isFlaskUsed = useStorage("isFlaskUsed", false);
  const bag = useBagStore();
  const board = useBoardStore();

  const isFlaskAvailable = computed(
    () => !isFlaskUsed.value && board.getCherrySum() > 7
  );

  function resetState() {
    isFlaskUsed.value = false;
    bag.resetState();
    board.resetState();
  }

  function useFlask() {
    const isReturnSuccessful = returnLastCherry();
    if (!isReturnSuccessful) return false;
    isFlaskUsed.value = true;
    return true;
  }

  function returnLastCherry() {
    const lastChip = board.drawnChips.pop();

    if (!lastChip) return false;

    if (lastChip?.name != "cherry") {
      board.drawnChips.push(lastChip);
      return false;
    }

    const cherryData = bag.chipsData.find(
      (chip) => chip.name == "cherry" && chip.value == lastChip.value
    );

    if (cherryData == null) return false;

    cherryData.leftInBag += 1;
    return true;
  }

  function drawChip() {
    return bag.drawRandomChip();
  }

  function prepareForNewPhase() {
    isFlaskUsed.value = false;
    bag.reset();
    board.reset();
  }

  function returnLastChipToBag() {
    const chip = board.removeLastChip();
    if (!chip) return;
    bag.addChip(chip as Chip);
  }

  return {
    bag,
    board,
    isFlaskAvailable,
    useFlask,
    returnLastCherry,
    drawChip,
    prepareForNewPhase,
    returnLastChipToBag,
    resetState,
  };
});
