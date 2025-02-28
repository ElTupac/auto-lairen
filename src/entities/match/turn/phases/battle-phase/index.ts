import { prompt } from "../../../../../prompt";
import { Phase } from "../../../../extensions/phase";

export class BattlePhase extends Phase {
  name = "battle-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    // TODO: Resolver todas las sub fases aca adentro y mandar para next_phase una vez cerrado

    const turnPlayer = this.match.getPlayerById(this.turn_player_owner_id);

    prompt(
      turnPlayer.player,
      [
        {
          label: "Declarar atacantes",
          value: "go-attack",
        },
        {
          label: "Terminar fase",
          value: "end-phase",
        },
        {
          label: "Apilar",
          value: "stack",
        },
      ],
      "sub-phase.declare-attacker"
    ).then((answer) => {
      if (answer.value === "end-phase") this.next_phase();
    });

    return;
  }

  endPhase(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }
}
