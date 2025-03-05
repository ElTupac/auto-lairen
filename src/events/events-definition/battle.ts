import { BattleDealtDamage } from "../../commands/battle/battle-dealt-damage";
import { BattleDeclareAttackers } from "../../commands/battle/battle-declare-attackers";
import { BattleDeclareBlockers } from "../../commands/battle/battle-declare-blockers";
import { BattleDeclareFight } from "../../commands/battle/battle-declare-fight";
import { BattleResolve } from "../../commands/battle/battle-resolve";
import { EventDefinition } from "../event-type";

export type BattleEventsDefinition = {
  "battle.declare-attackers": EventDefinition<BattleDeclareAttackers>;
  "battle.declare-blockers": EventDefinition<BattleDeclareBlockers>;
  "battle.resolve": EventDefinition<BattleResolve>;
  "battle.declare-fight": EventDefinition<BattleDeclareFight>;
  "battle.dealt-damage": EventDefinition<BattleDealtDamage>;
};
