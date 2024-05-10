import chipsData from 'assets/chips.json';
import Chip from 'src/components/models/chip/chip';
import ChipQuantity from 'src/components/models/chip/chipQuantity';
import ChipDto from 'src/components/models/chip/chipDto';

export default class GameChips {
  public static chips: Chip[];
  public static startingChips: ChipQuantity[];

  static {
    this.chips = this.getChips();
    this.startingChips = this.getStartingChips(this.chips);
  }

  private static getChips() {
    const chips = [] as Chip[];
    const chipsDtos = chipsData as ChipDto[];

    (chipsDtos as ChipDto[]).forEach((dto) => {
      chips.push(Chip.fromDto(dto, 1));
      if (dto.hasMultiple) {
        chips.push(Chip.fromDto(dto, 2));
        if (dto.name == 'cherry') chips.push(Chip.fromDto(dto, 3));
        else chips.push(Chip.fromDto(dto, 4));
      }
    });

    return chips;
  }

  private static getStartingChips(chips: Chip[]) {
    return chips.map((chip) => ChipQuantity.fromChip(chip));
  }

  public static groupChips(chips: ChipQuantity[]) {
    const groups: Record<string, ChipQuantity[]> = {};
    chips.forEach((chip) => {
      let name = chip.name;
      if (name == 'pumpkin' || name == 'moth' || name == 'ghost')
        name = 'single';
      if (!groups[name]) {
        groups[name] = [];
      }
      groups[name].push(chip);
    });
    return Object.keys(groups).map((name) => ({
      name,
      items: groups[name],
    }));
  }
}
