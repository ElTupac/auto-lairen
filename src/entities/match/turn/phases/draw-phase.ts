import { Phase } from "../../../extensions/phase";

export class DrawPhase extends Phase {
  name = "draw-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
