import { Phase } from "../../../extensions/phase";

export class MainPhase extends Phase {
  name = "main-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
