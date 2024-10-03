import { Phase } from "../../../../extensions/phase";

export class BattlePhase extends Phase {
  name = "battle-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
