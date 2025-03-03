import { randomUUID, UUID } from "crypto";
import { Player } from "../entities/player";
import { PromptsDefinitions } from "./prompts-definition";
import { Option } from "./prompt-type";

export const PROMPT_MAXIMUM_TIME = 500;

const listenersSubscribers: Partial<{
  [P in keyof PromptsDefinitions]: {
    fn: PromptsDefinitions[P];
    id: UUID;
  }[];
}> = {};

export const registerListener: <K extends keyof PromptsDefinitions>(
  eventName: K,
  fn: PromptsDefinitions[K]
) => { id: UUID; event_name: K; type: "listener"; unregister: () => void } = (
  event_name,
  fn
) => {
  const listener = { fn, id: randomUUID() };
  if (!Array.isArray(listenersSubscribers[event_name])) {
    listenersSubscribers[event_name] = [listener];
  } else listenersSubscribers[event_name].push(listener);

  return {
    id: listener.id,
    type: "listener",
    event_name,
    unregister: () => {
      if (Array.isArray(listenersSubscribers[event_name]))
        listenersSubscribers[event_name] = listenersSubscribers[
          event_name
        ].filter(({ id }) => id !== listener.id);
    },
  };
};

const modifiersSubscribers: Partial<{
  [P in keyof PromptsDefinitions]: {
    fn: PromptsDefinitions[P];
    id: UUID;
  }[];
}> = {};

export const registerModifier: <K extends keyof PromptsDefinitions>(
  eventName: K,
  fn: PromptsDefinitions[K]
) => { id: UUID; event_name: K; type: "modifier"; unregister: () => void } = (
  event_name,
  fn
) => {
  const modifier = { fn, id: randomUUID() };
  if (!Array.isArray(modifiersSubscribers[event_name])) {
    modifiersSubscribers[event_name] = [modifier];
  } else modifiersSubscribers[event_name].push(modifier);

  return {
    id: modifier.id,
    type: "modifier",
    event_name,
    unregister: () => {
      if (Array.isArray(modifiersSubscribers[event_name]))
        modifiersSubscribers[event_name] = modifiersSubscribers[
          event_name
        ].filter(({ id }) => id !== modifier.id);
    },
  };
};

export type PromptAdapter = (
  options: Option[],
  abortController: AbortController,
  defaultResponse?: Option,
  multipleChoice?: boolean
) => Promise<Option[]>;

const TIME_TO_ABORT = 1000 * 30;

export const multipleOptionPrompt: (
  player: Player,
  options: Option[],
  defaultResponse: Option,
  eventName?: keyof PromptsDefinitions
) => Promise<Option[]> = async (
  player,
  rawOptions,
  rawDefaultResponse,
  event_name
) => {
  const listeners = listenersSubscribers[event_name];
  let dataForPrompt: { options: Option[]; defaultResponse?: Option } = {
    options: [...rawOptions],
    defaultResponse: rawDefaultResponse,
  };
  for (let i = 0; i < listeners?.length; i++) {
    const [options, defaultResponse] = listeners[i].fn(
      dataForPrompt.options,
      dataForPrompt.defaultResponse
    );
    dataForPrompt = {
      options,
      defaultResponse,
    };
  }
  const { options, defaultResponse } = dataForPrompt;
  const abortController = new AbortController();
  let stoppedWaiting = false;

  let option = await new Promise<Option[]>(async (resolve) => {
    const abortTimeout = setTimeout(() => {
      stoppedWaiting = true;
      abortController.abort();
      resolve(defaultResponse ? [defaultResponse] : []);
    }, TIME_TO_ABORT);

    let answer: Option[] | undefined = undefined;
    do {
      const response = await player.prompt_system(
        options,
        abortController,
        defaultResponse,
        true
      );
      if (response.length) {
        clearTimeout(abortTimeout);
        answer = response;
      }
    } while (!answer && !stoppedWaiting);

    if (answer) resolve(answer);
  });

  const modifiers = modifiersSubscribers[event_name];
  for (let i = 0; i < modifiers?.length; i++) {
    const [options] = modifiers[i].fn(option);
    option = options;
  }

  return option;
};

export const prompt: (
  player: Player,
  options: Option[],
  event_name?: keyof PromptsDefinitions,
  defaultResponse?: Option
) => Promise<Option> = async (
  player,
  rawOptions,
  event_name,
  rawDefaultResponse
) => {
  const listeners = listenersSubscribers[event_name];
  let dataForPrompt: { options: Option[]; defaultResponse?: Option } = {
    options: [...rawOptions],
    defaultResponse: rawDefaultResponse,
  };
  for (let i = 0; i < listeners?.length; i++) {
    const [options, defaultResponse] = listeners[i].fn(
      dataForPrompt.options,
      dataForPrompt.defaultResponse
    );
    dataForPrompt = {
      options,
      defaultResponse,
    };
  }
  const { options, defaultResponse } = dataForPrompt;

  const abortController = new AbortController();
  let stoppedWaiting = false;

  let option = await new Promise<Option>(async (resolve) => {
    const abortTimeout = setTimeout(() => {
      stoppedWaiting = true;
      abortController.abort();
      resolve(defaultResponse || options[0]);
    }, TIME_TO_ABORT);

    let answer: Option | undefined = undefined;
    do {
      const [response] = await player.prompt_system(
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

  const modifiers = modifiersSubscribers[event_name];
  for (let i = 0; i < modifiers?.length; i++) {
    const [options] = modifiers[i].fn([option]);
    if (options[0]) option = options[0];
  }

  return option;
};
