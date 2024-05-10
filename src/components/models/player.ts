import Bag from "./bag";

export default class Player {
  public bag: Bag;
  public color: string;

  constructor(color = "Blue") {
    this.bag = new Bag();
    this.color = color;
  }
}
