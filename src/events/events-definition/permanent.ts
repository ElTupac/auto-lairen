import { PermanentCondemn } from "../../commands/permanents/permanent-condemn";
import { PermanentDead } from "../../commands/permanents/permanent-dead";
import { PermanentDestroy } from "../../commands/permanents/permanent-destroy";
import { PermanentMonumentCreate } from "../../commands/permanents/permanent-monument-create";
import { PermanentReturnHand } from "../../commands/permanents/permanent-return-hand";
import { PermanentSendKingdomBotton } from "../../commands/permanents/permanent-send-kingdom-bottom";
import { PermanentSendKingdomTop } from "../../commands/permanents/permanent-send-kingdom-top";
import { PermanentUnitCreate } from "../../commands/permanents/permanent-unit-create";
import { PermanentWeaponCreate } from "../../commands/permanents/permanent-weapon-create";
import { EventDefinition } from "../event-type";

export type PermanentEventsDefinitions = {
  "permanent.dead": EventDefinition<PermanentDead>;
  "permanent.destroy": EventDefinition<PermanentDestroy>;
  "permanent.condemn": EventDefinition<PermanentCondemn>;
  "permanent.return-hand": EventDefinition<PermanentReturnHand>;
  "permanent.return-kingdom-top": EventDefinition<PermanentSendKingdomTop>;
  "permanent.return-kingdom-bottom": EventDefinition<PermanentSendKingdomBotton>;
  "permanent.unit-create": EventDefinition<PermanentUnitCreate>;
  "permanent.monument-create": EventDefinition<PermanentMonumentCreate>;
  "permanent.weapon-create": EventDefinition<PermanentWeaponCreate>;
};
