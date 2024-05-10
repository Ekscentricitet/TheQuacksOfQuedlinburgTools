import Bag from "./bag";
import Board from "./board";

export default class Player {
  public bag: Bag;
  public color: string;
  public board: Board;

  constructor(color = "Blue") {
    this.bag = new Bag();
    this.color = color;
    this.board = new Board(this);
  }

  isFlaskUsed = false;
  isFlaskAvailable() {
    return !this.isFlaskUsed && this.board.getCherrySum() > 7;
  }

  useFlask() {
    const isReturnSuccessful = this.returnLastCherry();
    if (!isReturnSuccessful) return false;
    this.isFlaskUsed = true;
    return true;
  }

  returnLastCherry() {
    const lastChip = this.board.drawnChips.pop();

    if (!lastChip) return false;

    if (lastChip?.name != "cherry") {
      this.board.drawnChips.push(lastChip);
      return false;
    }

    const cherryInBag = this.bag.chipsData.find(
      (chip) => chip.name == "cherry" && chip.value == lastChip.value
    );

    if (cherryInBag == null) return false;

    cherryInBag.leftInBag += 1;
    return true;
  }

  drawChip() {
    return this.bag.drawRandomChip();
  }

  prepareForNewPhase() {
    this.isFlaskUsed = false;
    this.bag.reset();
    this.board.reset();
  }

  returnLastChipToBag() {
    const chip = this.board.removeLastChip();
    if (!chip) return;
    this.bag.addChip(chip);
  }
}
