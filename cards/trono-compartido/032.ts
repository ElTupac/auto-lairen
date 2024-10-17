import { EnterPermanentToField } from "../../src/commands/enter-permanent-to-field";
import { UnitPermanent } from "../../src/entities/board/permanents/unit-permanent";
import { UnitCard } from "../../src/entities/deck/kingdom/cards/unit-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { UnitCardSchema } from "../../src/schemas/cards/unit-card.schema";

export class Card032 extends UnitCard {
  schema: UnitCardSchema = {
    cost: 2,
    name: "Discípulo convertido",
    description:
      "Cuando fueras a perder vidas por una orden o efecto que controlas, ganas esa cantidad de vidas en su lugar.",
    subtype: ["demonio", "monje"],
    type: "unit",
    additional_cost: null,
    on_play: async () => {
      return new Stackable({
        resolution: () => {
          const { cost, description, name, subtype, type, data } = this.schema;
          const { attributes, resistance, strengh } = data;
          const permanent = new UnitPermanent({
            origin_id: this.id,
            schema: {
              cost,
              description,
              name,
              subtype,
              type,
              data: {
                attributes,
                resistance,
                strengh,
                activated_skills: [],
                static_skills: [],
                triggered_skills: [],
              },
            },
          });
          new EnterPermanentToField({ permanent });
        },
        type: "order",
      });
    },
    data: {
      activated_skills: [],
      attributes: [],
      resistance: 4,
      strengh: 2,
      static_skills: [],
      triggered_skills: [],
    },
  };
}
