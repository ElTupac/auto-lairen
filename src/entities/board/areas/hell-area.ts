import { KingdomCard } from "../../deck/kingdom/cards";
import { Area } from "../../extensions/area";
import { Treasure } from "../../extensions/treasure";

export class HellArea extends Area<KingdomCard | Treasure> {
  name = "hell-area";
}
