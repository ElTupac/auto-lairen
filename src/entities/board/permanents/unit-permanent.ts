import { UUID } from "crypto";
import { Permanent } from "../../extensions/permanent";
import { UnitPermanentSchema } from "../../../schemas/cards/unit-card.schema";
import { UnitCard } from "../../deck/kingdom/cards";

type UnitPermanentType = {
  origin_id: UUID;
  origin_order: UnitCard;
  schema: UnitPermanentSchema;
};

export class UnitPermanent extends Permanent<UnitPermanentSchema> {
  constructor(unitPermanent: UnitPermanentType) {
    super({
      origin: "unit",
      origin_id: unitPermanent.origin_id,
      origin_order: unitPermanent.origin_order,
      schema: unitPermanent.schema,
    });
  }
}
