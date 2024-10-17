import { UUID } from "crypto";
import { Permanent } from "../../extensions/permanent";
import { UnitPermanentSchema } from "../../../schemas/cards/unit-card.schema";

type UnitPermanentType = {
  origin_id: UUID;
  schema: UnitPermanentSchema;
};

export class UnitPermanent extends Permanent {
  private _schema: UnitPermanentSchema;

  constructor(unitPermanent: UnitPermanentType) {
    super({ origin: "unit", origin_id: unitPermanent.origin_id });
    this._schema = unitPermanent.schema;
  }

  get schema() {
    return this._schema;
  }
}
