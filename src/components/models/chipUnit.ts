import Chip from './chip';

export default class ChipUnit {
    constructor(
        public name: string,
        public icon: string,
        public color: string
    ) {
    }

    static fromChip(chip: Chip){
        return new ChipUnit(chip.name, chip.icon, chip.color)
    }
}
