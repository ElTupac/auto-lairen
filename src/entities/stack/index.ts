import { Stackable } from "../extensions/stackable";

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
  }

  get priority() {
    return this._priority;
  }
}
