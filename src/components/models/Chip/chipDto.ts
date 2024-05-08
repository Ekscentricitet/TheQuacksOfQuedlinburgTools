import Chip from './chip';

export default class ChipDto {
  constructor(
    public name: string,
    public activeRound: number,
    public fullName: string,
    public icon: string,
    public color: string,
    public hasMultiple: boolean
  ) {}

  public toChip(value: number) {
    return new Chip(
      this.name,
      this.activeRound,
      this.fullName,
      this.icon,
      this.color,
      value
    );
  }
}
