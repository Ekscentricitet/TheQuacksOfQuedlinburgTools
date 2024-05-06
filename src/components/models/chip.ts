import ChipDto from './chipDto';

export default class Chip {
  constructor(
    public name: string,
    public startingNumber: number,
    public activeRound: number,
    public fullName: string,
    public icon: string,
    public color: string,
    public currentNumber: number,
    public leftInBag: number,
    public value: number,
    public numberIcon: string
  ) {}

  static fromDtos(dtos: ChipDto[]): Chip[] {
    const chips = [] as Chip[];

    dtos.forEach((dto) => {
      chips.push(this.fromDto(dto, 1));

      if (dto.hasMultiple) {
        chips.push(this.fromDto(dto, 2));
        chips.push(this.fromDto(dto, 4));
      }
    });

    return chips;
  }

  static fromDto(dto: ChipDto, value: number) {
    const numberIcon = 'mdi-numeric-' + value.toString() + '-circle-outline';
    const startingNumber = Chip.getStartingNumber(dto, value);
    return new Chip(
      dto.name,
      startingNumber,
      dto.activeRound,
      dto.fullName,
      dto.icon,
      dto.color,
      startingNumber,
      startingNumber,
      value,
      numberIcon
    );
  }

  private static getStartingNumber(dto: ChipDto, value: number) {
    let startingNumber = 0;
    if (dto.name == 'cherry')
      if (value == 1) startingNumber = 4;
      else if (value == 2) startingNumber = 2;
      else startingNumber = 1;
    else if (dto.name == 'spider' || dto.name == 'pumpkin') startingNumber = 1;
    return startingNumber;
  }
}
