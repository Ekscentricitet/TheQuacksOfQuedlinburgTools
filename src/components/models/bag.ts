import ChipQuantity from './Chip/chipQuantity';
import GameChips from 'components/gameChips';

export default class Bag {
  public chips: ChipQuantity[];
  constructor() {
    this.chips = GameChips.startingChips;
  }
}
