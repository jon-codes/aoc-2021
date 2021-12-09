// @ts-check

const LENGTH_MAP = {
  2: [1],
  3: [7],
  4: [4],
  5: [2, 3, 5],
  6: [0, 6, 9],
  7: [8],
};

/**
 *
 * @param {string[]} input
 * @returns {{signals: string[], outputs: string[]}[]}
 */
const parseInput = (input) =>
  input.reduce((acc, line) => {
    const [signals, outputs] = line
      .split(" | ")
      .map((sub) => sub.split(" ").map((str) => str.split("").sort().join("")));

    return [...acc, { signals, outputs }];
  }, []);

/**
 *
 * @param {string} str1
 * @param {string} str2
 * @returns {number}
 */
const countCommonChars = (str1, str2) => {
  let count = 0;
  for (let i = 0; i < str1.length; i++) if (str2.includes(str1[i])) count++;
  return count;
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const lines = parseInput(input);

  let total = 0;

  for (const { signals, outputs } of lines) {
    const known = {};

    for (const signal of signals) {
      if (LENGTH_MAP[signal.length].length === 1) {
        known[LENGTH_MAP[signal.length][0]] = signal;
      }
    }

    for (const signal of signals) {
      if (LENGTH_MAP[signal.length].length !== 1) {
        if (signal.length === 5) {
          // is either 2, 3, or 5
          if (countCommonChars(signal, known[7]) === 3) {
            known[3] = signal;
          } else if (countCommonChars(signal, known[4]) === 2) {
            known[2] = signal;
          } else {
            known[5] = signal;
          }
        } else {
          // is either 0, 6, or 9
          if (countCommonChars(signal, known[1]) === 1) {
            known[6] = signal;
          } else if (countCommonChars(signal, known[4]) === 4) {
            known[9] = signal;
          } else {
            known[0] = signal;
          }
        }
      }
    }

    let result = "";

    for (const output of outputs) {
      result += Object.keys(known).find((key) => known[key] === output);
    }

    total += parseInt(result);
  }

  return total;
};

require("../utils/test")(solution, 61229);
