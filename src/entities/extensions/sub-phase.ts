export abstract class SubPhase {
  protected _on_finish: () => void;
  protected _priority_player: "player_1" | "player_2";

  constructor(priority_player: "player_1" | "player_2", on_finish: () => void) {
    this._on_finish = on_finish;
    this._priority_player = priority_player;
  }
}
