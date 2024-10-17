export const prompt: <T>(options: T[]) => Promise<T> = async (options) => {
  // TODO: See how to this options reach user, and how comes again
  return options[0];
};
