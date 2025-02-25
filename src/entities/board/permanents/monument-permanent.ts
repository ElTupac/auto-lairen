import { UUID } from "crypto";
import { MonumentPermanentSchema } from "../../../schemas/cards/monument-card.schema";
import { Permanent } from "../../extensions/permanent";
import { MonumentCard } from "../../deck/kingdom/cards/monument-card";

type MonumentPermanentType = {
  origin_id: UUID;
  origin_order: MonumentCard;
  schema: MonumentPermanentSchema;
};

export class MonumentPermanent extends Permanent<MonumentPermanentSchema> {
  constructor(monumentPermanent: MonumentPermanentType) {
    super({
      origin: "monument",
      origin_id: monumentPermanent.origin_id,
      origin_order: monumentPermanent.origin_order,
      schema: monumentPermanent.schema,
    });

    if (monumentPermanent.origin_order) {
      monumentPermanent.origin_order.linkPermanent(this);
    }
  }
}
