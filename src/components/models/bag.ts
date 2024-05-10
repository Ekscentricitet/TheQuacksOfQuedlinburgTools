import Chip from './chip/chip';
import ChipQuantity from './chip/chipQuantity';
import GameChips from 'components/gameChips';

export default class Bag {
  public chipsData: ChipQuantity[];

  constructor() {
    this.chipsData = JSON.parse(JSON.stringify(GameChips.startingChips));
  }

  public chipsBoughtThisRound = 0;

  addOneWhite() {
    const cherry1Index = this.chipsData.findIndex(
      (chip) => chip.name == 'cherry' && chip.value == 1
    );
    this.chipsData[cherry1Index].quantity += 1;
  }

  getRandomChip() {
    const chips = this.getChipsInBag();
    if (chips.length === 0) {
      return undefined;
    }

    const shuffled = chips.sort(() => Math.random() - 0.5);
    return shuffled.pop();
  }

  drawRandomChips(quantity: number) {
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
  }

  getChipsInBag() {
    return this.chipsData
      .filter((chip) => chip.leftInBag > 0)
      .flatMap((chip) => {
        const numberOfObjects = chip.leftInBag;
        return Array.from({ length: numberOfObjects }, () => chip as Chip);
      });
  }

  removeChipFromBag(chip: Chip) {
    const chipQuantity = this.getChipQuantity(chip);
    if (chipQuantity) chipQuantity.leftInBag--;
  }

  addChipToBag(chip: Chip) {
    const chipQuantity = this.getChipQuantity(chip);
    if (chipQuantity) chipQuantity.leftInBag++;
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
