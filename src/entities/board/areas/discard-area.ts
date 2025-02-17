import { KingdomCard } from "../../deck/kingdom/cards";
import { Area } from "../../extensions/area";
import { Treasure } from "../../extensions/treasure";

export class DiscardArea extends Area<KingdomCard | Treasure> {
  name = "discard";
}
