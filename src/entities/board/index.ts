import { Deck } from "../deck";
import { Kingdom } from "../deck/kingdom";
import { Vault } from "../deck/vault";
import { AttackArea } from "./areas/attack-area";
import { DiscardArea } from "./areas/discard-area";
import { FormationArea } from "./areas/formation-area";
import { HellArea } from "./areas/hell-area";
import { OutOfUseReserveArea } from "./areas/out-of-use-reserve-area";
import { ReserveArea } from "./areas/reserve-area";

type PlayerOwnBoard = {
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

  constructor(board: { deck_player_1: Deck; deck_player_2: Deck }) {
    this._deck_player_1 = board.deck_player_1;
    this._deck_player_2 = board.deck_player_2;

    this._areas = {
      player_1: {
        vault: this._deck_player_1.vault,
        kingdom: this._deck_player_1.kingdom,
        reserve: new ReserveArea(),
        out_of_use_reserve: new OutOfUseReserveArea(),
        formation: new FormationArea(),
        attack: new AttackArea(),
        discard: new DiscardArea(),
        hell: new HellArea(),
      },
      player_2: {
        vault: this._deck_player_2.vault,
        kingdom: this._deck_player_2.kingdom,
        reserve: new ReserveArea(),
        out_of_use_reserve: new OutOfUseReserveArea(),
        formation: new FormationArea(),
        attack: new AttackArea(),
        discard: new DiscardArea(),
        hell: new HellArea(),
      },
    };
  }

  get areas() {
    return this._areas;
  }
}
