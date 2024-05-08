import ChipQuantity from './Chip/chipQuantity';
import GameChips from 'components/gameChips';

export default class Bag {
  public chips: ChipQuantity[];
  constructor() {
    this.chips = GameChips.startingChips;
  }

  addOneWhite() {
    const cherry1Index = this.chips.findIndex(
      (chip) => chip.name == 'cherry' && chip.value == 1
    );
    this.chips[cherry1Index].quantity += 1;
  }
}
