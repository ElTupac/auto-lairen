import { Area } from "../../../../extensions/area";
import { Stackable } from "../../../../extensions/stackable";
import { ActionCard } from "../action-card";

export class ActionGhostCard extends ActionCard {
  constructor(startingArea: Area) {
    super(startingArea);
  }

  play() {
    return new Promise<Stackable>((resolve) => {});
  }
  additional_cost: undefined;
}
