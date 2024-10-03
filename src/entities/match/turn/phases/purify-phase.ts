import { Phase } from "../../../extensions/phase";

export class PurifyPhase extends Phase {
  name = "purify-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
