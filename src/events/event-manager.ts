import EventEmitter from "node:events";
import { EventsDefinitions } from "./events-definition";
import { randomUUID, UUID } from "node:crypto";

const eventManager = new EventEmitter();
const listenersSubscribers: Partial<{
  [P in keyof EventsDefinitions]: {
    fn: EventsDefinitions[P];
    id: UUID;
  }[];
}> = {};

export const registerListener: <K extends keyof EventsDefinitions>(
  eventName: K,
  fn: EventsDefinitions[K]
) => { id: UUID; event_name: K; type: "listener"; unregister: () => void } = (
  event_name,
  fn
) => {
  const listener = { fn, id: randomUUID() };
  if (!Array.isArray(listenersSubscribers[event_name])) {
    // @ts-expect-error
    listenersSubscribers[event_name] = [listener];
  } else listenersSubscribers[event_name].push(listener);

  return {
    id: listener.id,
    type: "listener",
    event_name,
    unregister: () => {
      if (Array.isArray(listenersSubscribers[event_name]))
        // @ts-expect-error
        listenersSubscribers[event_name] = listenersSubscribers[
          event_name
        ].filter(({ id }) => id !== listener.id);
    },
  };
};

const replacersSubscribers: Partial<{
  [P in keyof EventsDefinitions]: {
    fn: EventsDefinitions[P];
    id: UUID;
  }[];
}> = {};

export const registerReplacer: <K extends keyof EventsDefinitions>(
  eventName: K,
  fn: EventsDefinitions[K]
) => { id: UUID; event_name: K; type: "replacer"; unregister: () => void } = (
  event_name,
  fn
) => {
  const replacer = { fn, id: randomUUID() };
  if (!Array.isArray(replacersSubscribers[event_name])) {
    // @ts-expect-error
    replacersSubscribers[event_name] = [replacer];
  } else replacersSubscribers[event_name].push(replacer);

  return {
    id: replacer.id,
    type: "replacer",
    event_name,
    unregister: () => {
      if (Array.isArray(replacersSubscribers[event_name]))
        // @ts-expect-error
        replacersSubscribers[event_name] = replacersSubscribers[
          event_name
        ].filter(({ id }) => id !== replacer.id);
    },
  };
};

export const emitEvent: <K extends keyof EventsDefinitions>(
  eventName: K,
  ...args: Parameters<EventsDefinitions[K]>
) => void = (event_name, _args) => {
  const args = { ..._args, id: randomUUID() };
  console.log("Evento: ", {
    event_name,
    args,
  });
  const replacers = replacersSubscribers[event_name];
  let eventStopped: boolean = false;
  for (let i = 0; i < replacers?.length || 0; i++) {
    const replacer = replacers[i];
    // @ts-expect-error
    const answer = replacer.fn(args);
    if (answer) {
      console.log(`Respuesta replacer del evento ${event_name}: `, answer);
      eventStopped = true;
      break;
    }
  }

  if (!eventStopped) {
    args.data.execute();

    const listeners = listenersSubscribers[event_name];
    for (let i = 0; i < listeners?.length || 0; i++) {
      const listener = listeners[i];
      // @ts-expect-error
      const answer = listener.fn(args);
      if (answer) {
        console.log(`Respuesta listener del evento ${event_name}: `, answer);
      }
    }

    eventManager.emit(event_name, args);
  }
};
