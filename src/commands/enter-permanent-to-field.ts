import { Command } from "../entities/extensions/command";
import { Permanent } from "../entities/extensions/permanent";

export class EnterPermanentToField extends Command {
  constructor(enterPermanentToField: { permanent: Permanent }) {
    super();
  }
}
