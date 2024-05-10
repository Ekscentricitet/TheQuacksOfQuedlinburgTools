import Chip from "../models/chip";
import ChipQuantity from "../models/chipQuantity";
import GameChips from "src/components/managers/gameChips";

export default class Bag {
  public chipsData: ChipQuantity[];

  constructor() {
    this.chipsData = JSON.parse(JSON.stringify(GameChips.startingChips));
  }

  public chipsBoughtThisRound = 0;
  public areChipsOver = false;

  addOneWhite() {
    const cherry1Index = this.chipsData.findIndex(
      (chip) => chip.name == "cherry" && chip.value == 1
    );
    this.chipsData[cherry1Index].quantity += 1;
  }

  drawRandomChip() {
    const chips = this.getChipsInBag();

    if (chips.length === 0) return undefined;

    const shuffled = chips.sort(() => Math.random() - 0.5);
    const drawn = shuffled.pop();

    if (!drawn) return;

    this.removeChip(drawn);
    if (shuffled.length == 0) this.areChipsOver = true;

    return drawn;
  }

  viewRandomChips(quantity: number) {
    const chips = this.getChipsInBag();
    if (chips.length === 0) return undefined;

    const shuffled = chips.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(quantity, chips.length));
  }

  reset() {
    this.chipsData.map((chip) => {
      chip.leftInBag = chip.quantity;
      chip.boughtThisRound = false;
    });
    this.chipsBoughtThisRound = 0;
    this.areChipsOver = false;
  }

  getChipsInBag() {
    return this.chipsData
      .filter((chip) => chip.leftInBag > 0)
      .flatMap((chip) => {
        const numberOfObjects = chip.leftInBag;
        return Array.from({ length: numberOfObjects }, () => chip as Chip);
      });
  }

  removeChip(chip: Chip) {
    const chipQuantity = this.getChipQuantity(chip);
    if (chipQuantity) chipQuantity.leftInBag--;
  }

  buyChip(chip: Chip) {
    const chipQuantity = this.getChipQuantity(chip);

    if (!chipQuantity) return;

    chipQuantity.leftInBag++;
    chipQuantity.quantity++;
    chipQuantity.boughtThisRound = true;
    this.chipsBoughtThisRound++;
  }

  sellChip(chip: Chip) {
    const chipQuantity = this.getChipQuantity(chip);

    if (!chipQuantity) return;

    chipQuantity.leftInBag--;
    chipQuantity.quantity--;
    chipQuantity.boughtThisRound = false;
    this.chipsBoughtThisRound--;
  }

  getChipQuantity(chip: Chip) {
    return this.chipsData.find(
      (entry) => entry.name == chip.name && entry.value == chip.value
    );
  }
}
