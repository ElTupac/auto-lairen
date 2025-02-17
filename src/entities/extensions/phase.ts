import { randomUUID, UUID } from "crypto";
import { Match } from "../match";
import { Stack } from "../stack";

export type PhasePayload = {
  turn_id: UUID;
  turn_player_owner_id: UUID;
  turn_number: number;
  go_to_phase: (phase_to_go: number) => void;
  next_phase: () => void;
  match: Match;
};

export abstract class Phase {
  abstract name: string;
  private _id: UUID;

  private _turn_id: UUID;
  protected _turn_number: number;
  protected _turn_player_owner_id: UUID;

  protected match: Match;
  protected go_to_phase: (phase_to_go: number) => void;
  protected next_phase: () => void;

  constructor(phase: PhasePayload) {
    this._id = randomUUID();
    this._turn_id = phase.turn_id;
    this.match = phase.match;
    this.go_to_phase = phase.go_to_phase;
    this.next_phase = phase.next_phase;
    this._turn_player_owner_id = phase.turn_player_owner_id;
    this._turn_number = phase.turn_number;
  }

  get id() {
    return this._id;
  }
  get turn_id() {
    return this._turn_id;
  }
  get turn_player_owner_id() {
    return this._turn_player_owner_id;
  }
  get turn_number() {
    return this._turn_number;
  }

  abstract startPhase(): void;
  endPhase() {
    return new Promise<void>((resolve) => {
      new Stack({
        priority: this.match.getPlayerById(this._turn_player_owner_id).name,
        on_close_stack: resolve,
      });
    });
  }
}
