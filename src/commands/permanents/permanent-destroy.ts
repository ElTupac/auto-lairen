import {
  GeneralPermanent,
  UnitPermanent,
} from "../../entities/board/permanents";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";

export class PermanentDestroy extends Command {
  private _permanent: GeneralPermanent;

  constructor(permanent: GeneralPermanent) {
    super();
    this._permanent = permanent;

    if (!(permanent instanceof UnitPermanent) || permanent.is_destroyable)
      emitEvent("permanent.destroy", {
        origin_order: null,
        origin_permanent: permanent,
        origin_type: "interaction",
        data: this,
      });
  }

  execute() {
    this._permanent.destroy();
  }
}
