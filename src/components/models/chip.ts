import ChipDto from './chipDto';

export default class Chip {
    constructor(
        public name: string,
        public startingNumber: number,
        public activeRound: number,
        public fullName: string,
        public icon: string,
        public color: string,
        public currentNumber: number
    ) {
    }

    static fromDto(dto: ChipDto){
        return new Chip(dto.name, dto.startingNumber, dto.activeRound, dto.fullName, dto.icon, dto.color, dto.startingNumber)
    }
}
