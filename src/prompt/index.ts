import { Player } from "../entities/player";

export const PROMPT_MAXIMUM_TIME = 500;

type Option = { value: string; label: string };

export type PromptAdapter = (
  options: Option[],
  abortController: AbortController,
  defaultResponse?: Option
) => Promise<Option>;

const TIME_TO_ABORT = 1000 * 30;

export const prompt: (
  player: Player,
  options: Option[],
  defaultResponse?: Option
) => Promise<Option> = async (player, options, defaultResponse) => {
  const abortController = new AbortController();
  let stoppedWaiting = false;

  return new Promise<Option>(async (resolve) => {
    const abortTimeout = setTimeout(() => {
      stoppedWaiting = true;
      abortController.abort();
      resolve(defaultResponse || options[0]);
    }, TIME_TO_ABORT);

    let answer: Option | undefined = undefined;
    do {
      const response = await player.prompt_system(
        options,
        abortController,
        defaultResponse
      );
      const selectedOption = options.find(
        ({ value }) => value === response.value
      );

      if (selectedOption) {
        clearTimeout(abortTimeout);
        answer = selectedOption;
      }
    } while (!answer && !stoppedWaiting);

    if (answer) resolve(answer);
  });
};
