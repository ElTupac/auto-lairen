import { PhasePromptsDefinition } from "./phase";
import { SubPhasePromptsDefinition } from "./sub-phases";

export type PromptsDefinitions = PhasePromptsDefinition &
  SubPhasePromptsDefinition;
