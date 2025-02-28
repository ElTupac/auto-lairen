import { Card001 } from "../cards/pacto-secreto/001";
import { Card002 } from "../cards/pacto-secreto/002";
import { Card011 } from "../cards/pacto-secreto/011";
import { Card022 } from "../cards/pacto-secreto/022";
import { GenericTreasure } from "../cards/pacto-secreto/generic-treasure";
import { KingdomCard } from "../src/entities/deck/kingdom/cards";
import { Treasure } from "../src/entities/extensions/treasure";

export const createDeckCards: () => KingdomCard<unknown>[] = () => [
  new Card001(),
  new Card001(),
  new Card001(),
  new Card001(),
  new Card002(),
  new Card002(),
  new Card002(),
  new Card002(),
  new Card011(),
  new Card011(),
  new Card011(),
  new Card011(),
  new Card022(),
  new Card022(),
  new Card022(),
  new Card022(),
];

export const createVaultCards: () => Treasure[] = () => [
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
  new GenericTreasure(),
];
