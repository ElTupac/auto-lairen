export const PROMPT_MAXIMUM_TIME = 500;

export const prompt: <T>(options: T[]) => Promise<T> = async (options) => {
  return new Promise<(typeof options)[0]>((resolve) => {
    setTimeout(() => {
      resolve(options[0]);
    }, PROMPT_MAXIMUM_TIME);
  });
};
