import { prompt } from "../../../../../prompt";
import { UnitCard } from "../../../../deck/kingdom/cards/unit-card";
import { Phase } from "../../../../extensions/phase";
import { SubPhase } from "../../../../extensions/sub-phase";
import { Stack } from "../../../../stack";
import { AttackersSubPhase } from "./attackers-sub-phase";
import { DamageResolutionSubPhase } from "./damage-resolution-sub-phase";
import { BlockersSubPhase } from "./defenders-sub-phase";

export class BattlePhase extends Phase {
  name = "battle-phase";

  private _current_sub_phase: SubPhase | undefined = undefined;

  private _attackers_declared: UnitCard[] | null = null;

  get current_sub_phase() {
    return this._current_sub_phase;
  }

  get attackers_declared(): UnitCard[] {
    return this._attackers_declared || [];
  }

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    const damageResolutionSubPhase = () => {
      const turnPlayer = this.match.getPlayerById(this.turn_player_owner_id);

      this._current_sub_phase = new DamageResolutionSubPhase({
        on_finish: () => {
          const turnPlayer = this.match.getPlayerById(
            this.turn_player_owner_id
          );
          new Stack({
            priority: turnPlayer.name,
            on_close_stack: this.next_phase,
          });
        },
        priority_player: turnPlayer.name,
      });
    };

    const blockersSubPhase = () => {
      const turnPlayer = this.match.getPlayerById(this.turn_player_owner_id);

      this._current_sub_phase = new BlockersSubPhase({
        on_finish: damageResolutionSubPhase,
        priority_player:
          turnPlayer.name === "player_1" ? "player_2" : "player_1",
        declared_attackers: this.attackers_declared,
      });
    };

    const attackersSubPhase = () => {
      const turnPlayer = this.match.getPlayerById(this.turn_player_owner_id);

      this._current_sub_phase = new AttackersSubPhase({
        on_finish: (attackersDeclared) => {
          this._attackers_declared = attackersDeclared;
          blockersSubPhase();
        },
        on_cancel: this.next_phase,
        priority_player: turnPlayer.name,
      });
    };

    let hasOpenedStackAndCloseClean: boolean = false;

    const turnInit = () => {
      const turnPlayer = this.match.getPlayerById(this.turn_player_owner_id);
      const availableAttackers =
        turnPlayer.player.board.formation.content.filter(
          (card) =>
            card instanceof UnitCard &&
            card.permanent_linked &&
            card.permanent_linked.can_attack
        );

      prompt(
        turnPlayer.player,
        [
          {
            label: "Terminar fase",
            value: "end-phase",
          },
          ...(availableAttackers.length > 0
            ? [
                {
                  label: "Declarar atacantes",
                  value: "declare-attackers",
                },
              ]
            : []),
          ...(!hasOpenedStackAndCloseClean
            ? [
                {
                  label: "Apilar",
                  value: "stack",
                },
              ]
            : []),
        ],
        "sub-phase.declare-attacker"
      ).then((answer) => {
        if (answer.value === "end-phase") {
          return new Stack({
            priority: turnPlayer.name,
            on_close_stack: (hasResolvedElement) => {
              if (!hasResolvedElement) this.next_phase();
              else {
                hasOpenedStackAndCloseClean = false;
                turnInit();
              }
            },
            cut_first_priority_if_clean: true,
          });
        } else if (answer.value === "declare-attackers") {
          return new Stack({
            priority: turnPlayer.name === "player_1" ? "player_2" : "player_1",
            on_close_stack: (hasResolvedElement) => {
              if (!hasResolvedElement) attackersSubPhase();
              else {
                hasOpenedStackAndCloseClean = false;
                turnInit();
              }
            },
            cut_first_priority_if_clean: true,
          });
        } else if (answer.value === "stack") {
          return new Stack({
            priority: turnPlayer.name,
            on_close_stack: (hasResolvedElement) => {
              if (!hasResolvedElement) hasOpenedStackAndCloseClean = true;

              turnInit();
            },
            cut_first_priority_if_clean: true,
          });
        }
      });
    };

    return;
  }

  endPhase(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }
}
