export default class ChipDto {
  constructor(
    public name: string,
    public activeRound: number,
    public fullName: string,
    public icon: string,
    public color: string,
    public hasMultiple: boolean
  ) {}
}
