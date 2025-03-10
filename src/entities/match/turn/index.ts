import { randomUUID, UUID } from "crypto";
import { Phase } from "../../extensions/phase";
import { RechargePhase } from "./phases/recharge-phase";
import { RevelationPhase } from "./phases/revelation-phase";
import { DrawPhase } from "./phases/draw-phase";
import { MainPhase } from "./phases/main-phase";
import { BattlePhase } from "./phases/battle-phase";
import { EndPhase } from "./phases/end-phase";
import { PurifyPhase } from "./phases/purify-phase";
import { Match } from "..";

export class Turn {
  private _turn_number: number;
  private _id: UUID;
  private _player_owner_id: UUID;

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

  get phasesLength() {
    return this._phases.length;
  }

  get currentPhaseIndex() {
    return this._current_phase;
  }

  get currentPhase() {
    return this._phases[this.currentPhaseIndex];
  }

  private incrementCurrentPhase() {
    this._current_phase += 1;
  }

  get turn_number() {
    return this._turn_number;
  }
  get id() {
    return this._id;
  }

  private async _next_phase() {
    if (this.currentPhaseIndex + 1 >= this.phasesLength) {
      this._on_end_turn();
    } else {
      const phases = this._phases;

      await phases[this.currentPhaseIndex].endPhase();
      this.incrementCurrentPhase();
      phases[this.currentPhaseIndex].startPhase();
    }
  }

  constructor(
    turn: {
      turn_number: number;
      _player_owner_id: UUID;
      on_end_turn: () => void;
    },
    match: Match
  ) {
    this._turn_number = turn.turn_number;
    this._id = randomUUID();
    this._player_owner_id = turn._player_owner_id;
    this._on_end_turn = turn.on_end_turn;
    this._current_phase = 0;

    const phasePayload = {
      turn_player_owner_id: (() => this._player_owner_id)(),
      turn_number: (() => this.turn_number)(),
      go_to_phase: (index: number) => this._go_to_phase(index),
      next_phase: () => this._next_phase(),
      current_phase_number: () => this._current_phase,
      match,
      turn: this,
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
}
