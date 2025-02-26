import {
  GeneralPermanent,
  UnitPermanent,
} from "../../entities/board/permanents";
import { KingdomCard } from "../../entities/deck/kingdom/cards";
import { UnitGhostCard } from "../../entities/deck/kingdom/cards/ghost-cards/unit-ghost-card";
import { Area } from "../../entities/extensions/area";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { CardSchemaSubType } from "../../schemas/cards";

type PermanentUnitSchema = {
  cost?: number;
  data: {
    attributes: ["realeza"] | [];
    resistance: number;
    strengh: number;
  };
  description?: string;
  name: string;
  subtype: CardSchemaSubType;
};

export class PermanentUnitCreate extends Command {
  private _area: Area;
  private _schema: PermanentUnitSchema;

  constructor(
    schema: PermanentUnitSchema,
    areaToCreate: Area,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    }
  ) {
    super();
    this._area = areaToCreate;
    this._schema = schema;

    emitEvent("permanent.unit-create", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    const ghostOrder = new UnitGhostCard(this._area);
    const { data, name, subtype, cost = 0, description = "" } = this._schema;
    new UnitPermanent({
      linked_card: ghostOrder,
      origin_id: null,
      origin_order: null,
      schema: {
        data,
        name,
        description,
        cost,
        permanent_type: "unit",
        type: "unit",
        subtype,
      },
    });
  }
}
