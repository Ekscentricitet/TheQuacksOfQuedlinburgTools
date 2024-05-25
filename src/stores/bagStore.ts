/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import GameChips from "src/managers/gameChips";
import Chip from "src/models/chip";
import ChipQuantity from "src/models/chipQuantity";

export const useBagStore = defineStore("bag", () => {
  const chipsData = useStorage(
    "chipsData",
    JSON.parse(JSON.stringify(GameChips.startingChips)) as ChipQuantity[]
  );
  const chipsBoughtThisRound = useStorage("chipsBoughtThisRound", 0);
  const areChipsOver = useStorage("areChipsOver", false);

  function resetState() {
    chipsData.value = [] as ChipQuantity[];
    chipsBoughtThisRound.value = 0;
    areChipsOver.value = false;
  }

  function addOneWhite() {
    const cherry1Index = chipsData.value.findIndex(
      (chip) => chip.name == "cherry" && chip.value == 1
    );
    chipsData.value[cherry1Index].quantity += 1;
  }

  function drawRandomChip() {
    const chips = getChipsInBag();

    if (chips.length === 0) return undefined;

    const shuffled = chips.sort(() => Math.random() - 0.5);
    const drawn = shuffled.pop();

    if (!drawn) return;

    removeChip(drawn);
    if (shuffled.length == 0) areChipsOver.value = true;

    return drawn;
  }

  function viewRandomChips(quantity: number) {
    const chips = getChipsInBag();
    if (chips.length === 0) return undefined;

    const shuffled = chips.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(quantity, chips.length));
  }

  function reset() {
    chipsData.value.forEach((chip) => {
      chip.leftInBag = chip.quantity;
      chip.boughtThisRound = false;
    });
    chipsBoughtThisRound.value = 0;
    areChipsOver.value = false;
  }

  function getChipsInBag() {
    return chipsData.value
      .filter((chip) => chip.leftInBag > 0)
      .flatMap((chip) => {
        const numberOfObjects = chip.leftInBag;
        return Array.from(
          { length: numberOfObjects },
          () => chip as unknown as Chip
        );
      });
  }

  function removeChip(chip: Chip) {
    const chipQuantity = getChipQuantity(chip);
    if (chipQuantity) chipQuantity.leftInBag--;
  }

  function addChip(chip: Chip) {
    const chipQuantity = getChipQuantity(chip);
    if (chipQuantity) chipQuantity.leftInBag++;
  }

  function buyChip(chip: Chip) {
    const chipQuantity = getChipQuantity(chip);

    if (!chipQuantity) return;

    chipQuantity.leftInBag++;
    chipQuantity.quantity++;
    chipQuantity.boughtThisRound = true;
    chipsBoughtThisRound.value!++;
  }

  function sellChip(chip: Chip) {
    const chipQuantity = getChipQuantity(chip);

    if (!chipQuantity) return;

    chipQuantity.leftInBag--;
    chipQuantity.quantity--;
    chipQuantity.boughtThisRound = false;
    chipsBoughtThisRound.value!--;
  }

  function getChipQuantity(chip: Chip) {
    return chipsData.value.find(
      (entry) => entry.name == chip.name && entry.value == chip.value
    );
  }

  return {
    chipsData,
    areChipsOver,
    chipsBoughtThisRound,
    addOneWhite,
    drawRandomChip,
    viewRandomChips,
    reset,
    getChipsInBag,
    removeChip,
    addChip,
    buyChip,
    sellChip,
    getChipQuantity,
    resetState,
  };
});
