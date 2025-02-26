import { Area } from "../../../../extensions/area";
import { Stackable } from "../../../../extensions/stackable";
import { WeaponCard } from "../weapon-card";

export class WeaponGhostCard extends WeaponCard {
  constructor(startingArea: Area) {
    super(startingArea);
  }

  play() {
    return new Promise<Stackable>((resolve) => {});
  }
  additional_cost: undefined;
}
