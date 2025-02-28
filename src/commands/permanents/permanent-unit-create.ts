import {
  GeneralPermanent,
  UnitPermanent,
} from "../../entities/board/permanents";
import { KingdomCard } from "../../entities/deck/kingdom/cards";
import { UnitGhostCard } from "../../entities/deck/kingdom/cards/ghost-cards/unit-ghost-card";
import { UnitCard } from "../../entities/deck/kingdom/cards/unit-card";
import { Area } from "../../entities/extensions/area";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { CardSchemaSubType } from "../../schemas/cards";
import { UnitCardAttributeType } from "../../types/unit-card-attribute.type";

type PermanentUnitSchema = {
  cost?: number;
  data: {
    attributes: UnitCardAttributeType[];
    resistance: number;
    strengh: number;
  };
  description?: string;
  name: string;
  subtype: CardSchemaSubType;
};

export class PermanentUnitCreate extends Command {
  private _schema: PermanentUnitSchema;
  private _order: UnitCard;

  constructor(
    schema: PermanentUnitSchema,
    areaToCreate: Area,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    },
    order?: UnitCard
  ) {
    super();
    this._schema = schema;
    this._order = order || new UnitGhostCard(areaToCreate);

    emitEvent("permanent.unit-create", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    const { data, name, subtype, cost = 0, description = "" } = this._schema;
    new UnitPermanent({
      linked_card: this._order,
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
