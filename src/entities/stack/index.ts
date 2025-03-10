import { UUID } from "crypto";
import { PlayOrder } from "../../commands/play-order";
import { prompt } from "../../prompt";
import { KingdomCard } from "../deck/kingdom/cards";
import { Stackable } from "../extensions/stackable";
import { Match } from "../match";
import { PlayOptions } from "./play-options";
import { GetMatch } from "../../decorators/get-match";

let started: boolean = false;

export class Stack {
  private _priority: "player_1" | "player_2";
  private _on_close_stack: (hasResolvedElement?: boolean) => void;
  private _stack: Stackable[] = [];
  private _has_resolved_elements: boolean = false;
  private _cut_first_priority_if_clean: boolean = false;

  constructor(stack: {
    priority: "player_1" | "player_2";
    on_close_stack: (hasResolvedElement: boolean) => void;
    cut_first_priority_if_clean?: boolean;
  }) {
    this._priority = stack.priority;
    this._on_close_stack = stack.on_close_stack;
    if (stack.cut_first_priority_if_clean)
      this._cut_first_priority_if_clean = true;

    this.startStackIntervention();
  }

  get priority() {
    return this._priority;
  }

  get stack_is_clean() {
    return !this._stack.length;
  }

  get cut_first_priority_if_clean() {
    return this._cut_first_priority_if_clean;
  }

  @GetMatch()
  current_match: () => Match;

  private async startPriorityLoop(
    priority: "player_1" | "player_2",
    initialFlag?: boolean
  ) {
    if (this.current_match().paused) return;

    if (!initialFlag && priority === this.priority) {
      if (!this._stack.length) {
        started = false;
        return this._on_close_stack(this._has_resolved_elements);
      }
      const lastStackble = this._stack.pop();
      lastStackble.resolve();
      this._has_resolved_elements = true;
    }

    const playerWithPriority = this.current_match()[priority];

    const answer = await prompt(
      playerWithPriority,
      priority === "player_1"
        ? [
            { label: "p1 queda quieto", value: "p1_no-stack" },
            { label: "p1 hace algo", value: "p1_to-stack" },
          ]
        : [
            { label: "p2 queda quieto", value: "p2_no-stack" },
            { label: "p2 hace algo", value: "p2_to-stack" },
          ]
    );

    if (answer.value.includes("to-stack")) {
      const playerAnswer = await new Promise<UUID | null>((resolve) => {
        new PlayOptions(playerWithPriority).chooseOption().then(resolve);
      });
      if (playerAnswer) {
        const order = playerWithPriority.playerHand.content.find(
          ({ id }) => id === playerAnswer
        );
        if (order) {
          started = false;
          return new PlayOrder(
            playerWithPriority,
            order as KingdomCard<unknown>
          );
        }
      }
    } else if (
      answer.value.includes("no-stack") &&
      this.cut_first_priority_if_clean &&
      priority === this.priority &&
      this.stack_is_clean &&
      !this._has_resolved_elements
    ) {
      return this._on_close_stack(this._has_resolved_elements);
    }

    if (priority === "player_1") return this.startPriorityLoop("player_2");
    else return this.startPriorityLoop("player_1");
  }

  startStackIntervention() {
    if (!started) {
      started = true;
      this.startPriorityLoop(this.priority, true);
    }
  }

  resumeStackIntervention() {
    if (!started) this.startStackIntervention();
    else this.startPriorityLoop(this.priority);
  }

  tacTheStack(stackable: Stackable) {
    this._stack.push(stackable);
    this.startStackIntervention();
  }
}
