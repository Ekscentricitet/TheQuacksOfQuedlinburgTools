import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useBagStore } from "./bagStore";
import { useBoardStore } from "./boardStore";
import Chip from "src/components/models/chip";

export const usePlayerStore = defineStore("playerStore", () => {
  const color = useStorage("playerColor", "Blue");
  const isFlaskUsed = useStorage("isFlaskUsed", false);
  const bag = useBagStore();
  const board = useBoardStore();

  const isFlaskAvailable = computed(
    () => !isFlaskUsed.value && board.getCherrySum() > 7
  );

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

    const cherryInBag = bag.chipsData.find(
      (chip) => chip.name == "cherry" && chip.value == lastChip.value
    );

    if (cherryInBag == null) return false;

    cherryInBag.leftInBag += 1;
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
  };
});
