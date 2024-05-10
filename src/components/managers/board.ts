import Chip from "../models/chip";
import Player from "./player";

export default class Board {
  public drawnChips: Chip[] = [];

  constructor(public player: Player) {}

  placeChip(chip: Chip) {
    this.drawnChips.push(chip);
  }

  reset() {
    this.drawnChips = [];
  }

  getCherrySum() {
    const drawnCherries = this.drawnChips.filter(
      (chip) => chip.name == "cherry"
    );
    let sum = 0;
    drawnCherries.forEach((cherry) => (sum += cherry.value));
    return sum;
  }
}
