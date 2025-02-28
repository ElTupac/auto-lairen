import { UUID } from "crypto";
import { Player } from "../player";
import { KingdomCard } from "../deck/kingdom/cards";
import { prompt } from "../../prompt";

export class PlayOptions {
  private _player: Player;
  private _options: KingdomCard<unknown>[];

  constructor(player: Player) {
    this._player = player;

    // TODO: Add activate effects to search
    this._options = (
      this._player.playerHand.content as KingdomCard<unknown>[]
    ).filter(({ is_playable }) => is_playable);
  }

  async chooseOption(): Promise<UUID | null> {
    const answer = await prompt(this._player, [
      {
        label: "Ninguna",
        value: "none",
      },
      ...this._options.map(({ id, cost, schema }) => ({
        value: id,
        label: `Carta ${schema.name} coste ${cost}`,
      })),
    ]);

    if (answer.value === "none") return null;
    return answer.value as UUID;
  }
}
