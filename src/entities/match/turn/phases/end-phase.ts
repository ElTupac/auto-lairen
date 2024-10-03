import { Phase } from "../../../extensions/phase";

export class EndPhase extends Phase {
  name = "end-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
