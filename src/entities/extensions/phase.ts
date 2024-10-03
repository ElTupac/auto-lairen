import { randomUUID, UUID } from "crypto";
import { Match } from "../match";

export abstract class Phase {
  readonly name!: string;
  private _id: UUID;
  private _turn_id: UUID;

  protected _turn_player_owner_id: UUID;
  protected match: Match;
  protected go_to_phase: (phase_to_go: number) => void;
  protected next_phase: () => void;

  constructor(phase: {
    turn_id: UUID;
    turn_player_owner_id: UUID;
    go_to_phase: (phase_to_go: number) => void;
    next_phase: () => void;
    match: Match;
  }) {
    this._id = randomUUID();
    this._turn_id = phase.turn_id;
    this.match = phase.match;
    this.go_to_phase = phase.go_to_phase;
    this.next_phase = phase.next_phase;
  }

  get id() {
    return this._id;
  }
  get turn_id() {
    return this._turn_id;
  }

  abstract startPhase(): Promise<void>;
  abstract endPhase(): Promise<void>;
}
