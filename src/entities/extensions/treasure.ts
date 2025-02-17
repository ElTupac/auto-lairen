import { Area } from "./area";
import { Card } from "./card";

export class Treasure extends Card<{}> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }
}
