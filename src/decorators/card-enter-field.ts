import { AttackArea } from "../entities/board/areas/attack-area";
import { FormationArea } from "../entities/board/areas/formation-area";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { registerListener } from "../events/event-manager";

export const CardEnterField: () => MethodDecorator =
  () =>
  (
    target: KingdomCard<unknown>,
    propertyKey,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = (...args: unknown[]) => {
      return undefined;
    };

    registerListener("board.move-card-to-area", (e) => {
      if (
        e.data.card.id === target.id &&
        (e.data.area instanceof FormationArea ||
          e.data.area instanceof AttackArea)
      ) {
        originalMethod();
      }
    });

    return propertyDescriptor;
  };
