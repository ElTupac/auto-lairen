import { Area } from "../../../../extensions/area";
import { Stackable } from "../../../../extensions/stackable";
import { MonumentCard } from "../monument-card";

export class MonumentGhostCard extends MonumentCard {
  constructor(startingArea: Area) {
    super(startingArea);
  }

  play() {
    return new Promise<Stackable>((resolve) => {});
  }
  additional_cost: undefined;
}
