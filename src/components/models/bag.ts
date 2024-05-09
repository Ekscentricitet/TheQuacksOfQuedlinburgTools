import Chip from './Chip/chip';
import ChipQuantity from './Chip/chipQuantity';
import GameChips from 'components/gameChips';

export default class Bag {
  public chipsData: ChipQuantity[];
  constructor() {
    this.chipsData = JSON.parse(JSON.stringify(GameChips.startingChips));
  }

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
    const chipData = this.chipsData.find(
      (entry) => entry.name == chip.name && entry.value == chip.value
    );
    if (chipData) chipData.leftInBag--;
  }

  addChipToBag(chip: Chip) {
    const chipData = this.chipsData.find(
      (entry) => entry.name == chip.name && entry.value == chip.value
    );
    if (chipData) chipData.leftInBag++;
  }
}
