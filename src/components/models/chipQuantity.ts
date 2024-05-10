import Chip from "./chip";

export default class ChipQuantity extends Chip {
  public quantity: number;
  public leftInBag: number;
  public boughtThisRound = false;

  constructor(...chipParams: ConstructorParameters<typeof Chip>) {
    super(...chipParams);
    this.quantity = this.startingNumber;
    this.leftInBag = this.startingNumber;
  }

  static fromChip(chip: Chip) {
    const chipJson = JSON.stringify(chip);
    const chipQuantity = JSON.parse(chipJson) as ChipQuantity;
    chipQuantity.quantity = chipQuantity.startingNumber;
    chipQuantity.leftInBag = chipQuantity.startingNumber;
    return chipQuantity;
  }
}
