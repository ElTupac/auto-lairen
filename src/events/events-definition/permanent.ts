import { PermanentCondemn } from "../../commands/permanents/permanent-condemn";
import { PermanentDestroy } from "../../commands/permanents/permanent-destroy";
import { PermanentReturnHand } from "../../commands/permanents/permanent-return-hand";
import { PermanentSendKingdomBotton } from "../../commands/permanents/permanent-send-kingdom-bottom";
import { PermanentSendKingdomTop } from "../../commands/permanents/permanent-send-kingdom-top";
import { EventDefinition } from "../event-type";

export type PermanentEventsDefinitions = {
  "permanent.destroy": EventDefinition<PermanentDestroy>;
  "permanent.condemn": EventDefinition<PermanentCondemn>;
  "permanent.return-hand": EventDefinition<PermanentReturnHand>;
  "permanent.return-kingdom-top": EventDefinition<PermanentSendKingdomTop>;
  "permanent.return-kingdom-bottom": EventDefinition<PermanentSendKingdomBotton>;
};
