import { Phase } from "../../../extensions/phase";

export class RechargePhase extends Phase {
  name = "recharge-phase";

  async startPhase() {
    console.log(this.name);
    return;
  }
  async endPhase() {
    return;
  }
}
