import readline from "node:readline";

export const PROMPT_MAXIMUM_TIME = 500;

const _ = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const prompt: (
  options: {
    value: string;
    label: string;
  }[]
) => Promise<{
  value: string;
  label: string;
}> = async (options) => {
  const questionParts = [];
  for (let i = 0; i < options.length; i++) {
    questionParts.push(`${options[i].label} - ${options[i].value}\n`);
  }

  return new Promise<(typeof options)[0]>((resolve, reject) => {
    _.question(questionParts.join(""), (answer) => {
      const selectedOption = options.find(
        ({ value }) => value === answer || answer.includes(value)
      );
      if (!selectedOption) reject(new Error("Option doesn't exists"));

      resolve(selectedOption);
    });
  });
};
