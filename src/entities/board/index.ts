import { Deck } from "../deck";
import { Kingdom } from "../deck/kingdom";
import { Vault } from "../deck/vault";
import { Player } from "../player";
import { AttackArea } from "./areas/attack-area";
import { DiscardArea } from "./areas/discard-area";
import { FormationArea } from "./areas/formation-area";
import { HellArea } from "./areas/hell-area";
import { OutOfUseReserveArea } from "./areas/out-of-use-reserve-area";
import { ReserveArea } from "./areas/reserve-area";

export type PlayerOwnBoard = {
  vault: Vault;
  kingdom: Kingdom;
  reserve: ReserveArea;
  out_of_use_reserve: OutOfUseReserveArea;
  formation: FormationArea;
  attack: AttackArea;
  discard: DiscardArea;
  hell: HellArea;
};

export class Board {
  private _deck_player_1: Deck;
  private _deck_player_2: Deck;

  private _areas: {
    player_1: PlayerOwnBoard;
    player_2: PlayerOwnBoard;
  };

  constructor(
    board: { deck_player_1: Deck; deck_player_2: Deck },
    players: {
      player_1: Player;
      player_2: Player;
    }
  ) {
    this._deck_player_1 = board.deck_player_1;
    this._deck_player_2 = board.deck_player_2;

    this._areas = {
      player_1: {
        vault: this._deck_player_1.vault,
        kingdom: this._deck_player_1.kingdom,
        reserve: new ReserveArea(players.player_1),
        out_of_use_reserve: new OutOfUseReserveArea(players.player_1),
        formation: new FormationArea(players.player_1),
        attack: new AttackArea(players.player_1),
        discard: new DiscardArea(players.player_1),
        hell: new HellArea(players.player_1),
      },
      player_2: {
        vault: this._deck_player_2.vault,
        kingdom: this._deck_player_2.kingdom,
        reserve: new ReserveArea(players.player_2),
        out_of_use_reserve: new OutOfUseReserveArea(players.player_2),
        formation: new FormationArea(players.player_2),
        attack: new AttackArea(players.player_2),
        discard: new DiscardArea(players.player_2),
        hell: new HellArea(players.player_2),
      },
    };
  }

  get areas() {
    return this._areas;
  }
}
