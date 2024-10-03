import { Phase } from "../../../extensions/phase";

export class RevelationPhase extends Phase {
  name = "revelation-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
