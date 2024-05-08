import ChipDto from './chipDto';

export default class Chip {
  public startingNumber: number;
  public numberIcon: string;

  constructor(
    public name: string,
    public activeRound: number,
    public fullName: string,
    public icon: string,
    public color: string,
    public value: number
  ) {
    const numberIcon = 'mdi-numeric-' + value.toString() + '-circle-outline';
    const startingNumber = this.getStartingNumber(name, value);
    this.startingNumber = startingNumber;
    this.numberIcon = numberIcon;
  }

  static fromDto(dto: ChipDto, value: number) {
    return new Chip(
      dto.name,
      dto.activeRound,
      dto.fullName,
      dto.icon,
      dto.color,
      value
    );
  }

  private getStartingNumber(name: string, value: number) {
    let startingNumber = 0;
    if (name == 'cherry')
      if (value == 1) startingNumber = 4;
      else if (value == 2) startingNumber = 2;
      else startingNumber = 1;
    else if (name == 'spider' && value == 1) startingNumber = 1;
    else if (name == 'pumpkin') startingNumber = 1;
    return startingNumber;
  }
}
