import { UUID } from "crypto";
import { StaticEffect } from "../extensions/static-effect";

const staticEffectsLayer: StaticEffect[] = [];

export const StaticEffectsLayer = () => {
  return staticEffectsLayer;
};

export const registerStaticEffect = (effect: StaticEffect) => {
  staticEffectsLayer.push(effect);
};

export const unregisterStaticEffect = (effect_id: UUID) => {
  const index = staticEffectsLayer.findIndex(({ id }) => id === effect_id);
  if (index !== -1) {
    staticEffectsLayer.splice(index, 1);
  }
};
