import chipsData from 'assets/chips.json';
import Chip from 'components/models/chip';
import ChipQuantity from 'components/models/chipQuantity';
import ChipDto from 'components/models/chipDto';

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
        if (dto.name == 'cherry') chips.push(Chip.fromDto(dto, 31));
        else chips.push(Chip.fromDto(dto, 4));
      }
    });

    return chips;
  }

  private static getStartingChips(chips: Chip[]) {
    return chips.map((chip) => ChipQuantity.fromChip(chip));
  }

  public static groupChips(chips: Chip[]) {
    const groups: Record<string, Chip[]> = {};
    chips.forEach((chip) => {
      const name = chip.name;
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