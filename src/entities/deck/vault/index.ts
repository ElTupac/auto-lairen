import { Area } from "../../extensions/area";
import { Treasure } from "../../extensions/treasure";

export class Vault extends Area<Treasure> {
  name = "vault-area";

  constructor(vault: Treasure[]) {
    super(vault);
  }

  popTopCard() {
    return this.popCardByIndex(0);
  }
}
