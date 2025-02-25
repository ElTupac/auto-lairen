import { UUID } from "crypto";
import { WeaponPermanentSchema } from "../../../schemas/cards/weapon-card.schema";
import { Permanent } from "../../extensions/permanent";
import { WeaponCard } from "../../deck/kingdom/cards/weapon-card";

type WeaponPermanentType = {
  origin_id: UUID;
  origin_order: WeaponCard;
  schema: WeaponPermanentSchema;
};

export class WeaponPermanent extends Permanent<WeaponPermanentSchema> {
  constructor(weaponPermanent: WeaponPermanentType) {
    super({
      origin: "weapon",
      origin_id: weaponPermanent.origin_id,
      origin_order: weaponPermanent.origin_order,
      schema: weaponPermanent.schema,
    });

    if (weaponPermanent.origin_order) {
      weaponPermanent.origin_order.linkPermanent(this);
    }
  }
}
