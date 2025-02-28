import {
  GeneralPermanent,
  WeaponPermanent,
} from "../../entities/board/permanents";
import { KingdomCard } from "../../entities/deck/kingdom/cards";
import { WeaponGhostCard } from "../../entities/deck/kingdom/cards/ghost-cards/weapon-ghost-card";
import { WeaponCard } from "../../entities/deck/kingdom/cards/weapon-card";
import { Area } from "../../entities/extensions/area";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { CardSchemaSubType } from "../../schemas/cards";

type PermanentWeaponSchema = {
  cost?: number;
  data: {
    endurance: number;
    resistance_buff: number;
    strengh_buff: number;
  };
  description?: string;
  name: string;
  subtype: CardSchemaSubType;
};

export class PermanentWeaponCreate extends Command {
  private _schema: PermanentWeaponSchema;
  private _order: WeaponCard;

  constructor(
    schema: PermanentWeaponSchema,
    areaToCreate: Area,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    },
    order?: WeaponCard
  ) {
    super();
    this._schema = schema;
    this._order = order || new WeaponGhostCard(areaToCreate);

    emitEvent("permanent.weapon-create", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    const { data, name, subtype, cost = 0, description = "" } = this._schema;
    new WeaponPermanent({
      linked_card: this._order,
      origin_id: null,
      origin_order: null,
      schema: {
        data,
        name,
        description,
        cost,
        permanent_type: "weapon",
        type: "weapon",
        subtype,
      },
    });
  }
}
