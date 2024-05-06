import Chip from './chip';

export default class ChipUnit {
  constructor(
    public name: string,
    public icon: string,
    public color: string,
    public value: number,
    public numberIcon: string
  ) {}

  static fromChip(chip: Chip) {
    return new ChipUnit(
      chip.name,
      chip.icon,
      chip.color,
      chip.value,
      chip.numberIcon
    );
  }
}
