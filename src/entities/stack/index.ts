import { UUID } from "crypto";
import { PlayOrder } from "../../commands/play-order";
import { prompt } from "../../prompt";
import { KingdomCard } from "../deck/kingdom/cards";
import { Stackable } from "../extensions/stackable";
import { getCurrentMatch } from "../match";
import { PlayOptions } from "./play-options";

let started: boolean = false;

export class Stack {
  private _priority: "player_1" | "player_2";
  private _on_close_stack: () => void;
  private _stack: Stackable[] = [];

  constructor(stack: {
    priority: "player_1" | "player_2";
    on_close_stack: () => void;
  }) {
    this._priority = stack.priority;
    this._on_close_stack = stack.on_close_stack;

    this.startStackIntervention();
  }

  get priority() {
    return this._priority;
  }

  private async startPriorityLoop(
    priority: "player_1" | "player_2",
    initialFlag?: boolean
  ) {
    if (!initialFlag && priority === this.priority) {
      if (!this._stack.length) {
        started = false;
        return this._on_close_stack();
      }
      const lastStackble = this._stack.pop();
      lastStackble.resolve();
    }
    const answer = await prompt(
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
        new PlayOptions(getCurrentMatch()[priority])
          .chooseOption()
          .then(resolve);
      });
      if (playerAnswer) {
        const order = getCurrentMatch()[priority].playerHand.content.find(
          ({ id }) => id === playerAnswer
        );
        if (order) {
          started = false;
          return new PlayOrder(
            getCurrentMatch()[priority],
            order as KingdomCard<unknown>
          );
        }
      }
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

  tacTheStack(stackable: Stackable) {
    this._stack.push(stackable);
    this.startStackIntervention();
  }
}
