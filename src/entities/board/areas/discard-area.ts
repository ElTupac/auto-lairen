import { Area } from "../../extensions/area";
import { Card } from "../../extensions/card";
import { Treasure } from "../../extensions/treasure";

export class DiscardArea extends Area<Card | Treasure> {
  name = "discard";
}
