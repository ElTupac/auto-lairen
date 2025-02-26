import { Area } from "../../../../extensions/area";
import { Stackable } from "../../../../extensions/stackable";
import { UnitCard } from "../unit-card";

export class UnitGhostCard extends UnitCard {
  constructor(startingArea: Area) {
    super(startingArea);
  }

  play() {
    return new Promise<Stackable>((resolve) => {});
  }
  additional_cost: undefined;
}
