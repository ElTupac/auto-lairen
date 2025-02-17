import { Area } from "../entities/extensions/area";
import { Card } from "../entities/extensions/card";
import { Command } from "../entities/extensions/command";

export class MoveCardToArea extends Command {
  private _card: Card<unknown>;
  private _area: Area;

  constructor(card: Card<unknown>, areaToMove: Area) {
    super();
    this._card = card;
    this._area = areaToMove;
  }

  execute(): void {
    this._area.moveCardToThisArea(this._card);
  }
}
