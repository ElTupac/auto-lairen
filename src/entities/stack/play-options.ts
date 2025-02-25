import { UUID } from "crypto";
import { Player } from "../player";
import { KingdomCard } from "../deck/kingdom/cards";
import { prompt } from "../../prompt";

export class PlayOptions {
  private _player: Player;
  private _options: KingdomCard<unknown>[];

  constructor(player: Player) {
    // TODO: ask to player
    this._player = player;

    // TODO: better search method
    // also TODO: check if has stack running and is playable with it
    this._options = (
      this._player.playerHand.content as KingdomCard<unknown>[]
    ).filter(({ is_playable }) => is_playable);
  }

  async chooseOption(): Promise<UUID | null> {
    const answer = await prompt(this._player, [
      ...this._options.map(({ id, cost }) => ({
        value: id,
        label: `Carta coste ${cost}`,
      })),
      {
        label: "Ninguna",
        value: "none",
      },
    ]);

    if (answer.value === "none") return null;
    return answer.value as UUID;
  }
}
