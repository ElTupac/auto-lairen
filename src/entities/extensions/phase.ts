import { randomUUID, UUID } from "crypto";

export abstract class Phase {
  readonly name!: string;
  private _id: UUID;
  private _turn_id: UUID;

  constructor(phase: {
    turn_id: UUID;
    go_to_phase: (phase_to_go: number) => void;
    next_phase: () => void;
  }) {
    this._id = randomUUID();
    this._turn_id = phase.turn_id;
  }

  get id() {
    return this._id;
  }
  get turn_id() {
    return this._turn_id;
  }

  startPhase: () => Promise<void>;
  endPhase: () => Promise<void>;
}
