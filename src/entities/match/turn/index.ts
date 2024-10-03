import { randomUUID, UUID } from "crypto";
import { Phase } from "../../extensions/phase";
import { RechargePhase } from "./phases/recharge-phase";
import { RevelationPhase } from "./phases/revelation-phase";
import { DrawPhase } from "./phases/draw-phase";
import { MainPhase } from "./phases/main-phase";
import { BattlePhase } from "./phases/battle-phase";
import { EndPhase } from "./phases/end-phase";
import { PurifyPhase } from "./phases/purify-phase";

export class Turn {
  private _turn_number: number;
  private _id: UUID;

  private _phases: Phase[];
  private _current_phase: number;
  private _on_end_turn: () => void;

  private async _go_to_phase(phase_to_go: number) {
    if (this._phases[phase_to_go]) {
      await this._phases[this._current_phase].endPhase();
      this._current_phase = phase_to_go;
      await this._phases[this._current_phase].startPhase();
    }
  }
  private async _next_phase() {
    if (this._current_phase >= this._phases.length) {
      this._on_end_turn();
    } else {
      await this._phases[this._current_phase].endPhase();
      this._current_phase += 1;
      await this._phases[this._current_phase].startPhase();
    }
  }

  constructor(turn: { turn_number: number; on_end_turn: () => void }) {
    this._turn_number = turn.turn_number;
    this._id = randomUUID();
    this._on_end_turn = turn.on_end_turn;
    this._current_phase = 0;

    const phasePayload = {
      turn_id: this._id,
      go_to_phase: this._go_to_phase,
      next_phase: this._next_phase,
    };

    this._phases = [
      new RechargePhase(phasePayload),
      new RevelationPhase(phasePayload),
      new DrawPhase(phasePayload),
      new MainPhase(phasePayload),
      new BattlePhase(phasePayload),
      new MainPhase(phasePayload),
      new EndPhase(phasePayload),
      new PurifyPhase(phasePayload),
    ];

    this._phases[this._current_phase].startPhase();
  }

  get turn_number() {
    return this._turn_number;
  }
  get id() {
    return this._id;
  }
  get current_phase() {
    return this._phases.slice(this._current_phase, 1);
  }
}
