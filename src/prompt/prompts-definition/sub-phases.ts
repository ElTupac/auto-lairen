import { PromptDefinition } from "../prompt-type";

export type SubPhasePromptsDefinition = {
  "sub-phase.declare-attacker": PromptDefinition;
  "sub-phase.declare-blockers": PromptDefinition;
  "sub-phase.choose-attacker-to-block": PromptDefinition;
  "sub-phase.choose-blockers-for-attacker": PromptDefinition;
  "sub-phase.end-declare-attackers": PromptDefinition;
  "sub-phase.end-declare-blockers": PromptDefinition;
  "sub-phase.choose-target-for-damage-distribution": PromptDefinition;
  "sub-phase.choose-damage-distribution": PromptDefinition;
  "sub-phase.end-damage-resolution": PromptDefinition;
};
