import { PromptDefinition } from "../prompt-type";

export type SubPhasePromptsDefinition = {
  "sub-phase.declare-attacker": PromptDefinition;
  "sub-phase.end-declare-attackers": PromptDefinition;
  "sub-phase.end-declare-blockers": PromptDefinition;
  "sub-phase.end-damage-resolution": PromptDefinition;
};
