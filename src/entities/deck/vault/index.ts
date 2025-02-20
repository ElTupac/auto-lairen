import { Area } from "../../extensions/area";
import { Treasure } from "../../extensions/treasure";
import { Player } from "../../player";

export class Vault extends Area {
  name = "vault-area";

  constructor(player: Player, vault: Treasure[]) {
    super(player, vault);
  }

  popTopCard() {
    return this.popCardByIndex(0);
  }
}
