import { GeneralPermanent } from "../../entities/board/permanents";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";

export class PermanentDead extends Command {
  private _permanent: GeneralPermanent;

  constructor(permanent: GeneralPermanent) {
    super();
    this._permanent = permanent;

    emitEvent("permanent.dead", {
      origin_order: null,
      origin_permanent: permanent,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    this._permanent.dead();
  }
}
