export type Option = { value: string; label: string };

export type PromptDefinition = (
  options: Option[],
  defaultResponse?: Option
) => [Option[], Option | undefined];
