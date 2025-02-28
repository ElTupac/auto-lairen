import {
  GeneralPermanent,
  MonumentPermanent,
} from "../../entities/board/permanents";
import { KingdomCard } from "../../entities/deck/kingdom/cards";
import { MonumentGhostCard } from "../../entities/deck/kingdom/cards/ghost-cards/monument-ghost-card";
import { MonumentCard } from "../../entities/deck/kingdom/cards/monument-card";
import { Area } from "../../entities/extensions/area";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { CardSchemaSubType } from "../../schemas/cards";

type PermanentMonumentSchema = {
  cost?: number;
  data: {};
  description?: string;
  name: string;
  subtype: CardSchemaSubType;
};

export class PermanentMonumentCreate extends Command {
  private _schema: PermanentMonumentSchema;
  private _order: MonumentCard;

  constructor(
    schema: PermanentMonumentSchema,
    areaToCreate: Area,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    },
    order?: MonumentCard
  ) {
    super();
    this._schema = schema;
    this._order = order || new MonumentGhostCard(areaToCreate);

    emitEvent("permanent.monument-create", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    const { data, name, subtype, cost = 0, description = "" } = this._schema;
    new MonumentPermanent({
      linked_card: this._order,
      origin_id: null,
      origin_order: null,
      schema: {
        data,
        name,
        description,
        cost,
        permanent_type: "monument",
        type: "monument",
        subtype,
      },
    });
  }
}
