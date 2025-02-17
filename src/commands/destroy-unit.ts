import { UnitPermanent } from "../entities/board/permanents/unit-permanent";
import { Command } from "../entities/extensions/command";

export class DestroyUnit extends Command {
  private _unit: UnitPermanent;

  constructor(unit: UnitPermanent) {
    super();
    this._unit = unit;
  }

  execute(): void {}
}
