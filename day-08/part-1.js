// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {string[][]}
 */
const parseInput = (input) =>
  input.map((str) =>
    str
      .split(" | ")[1]
      .split(" ")
      .map((sub) => sub.split("").sort().join(""))
  );

/**
 *
 * @param {string} str
 * @returns {number}
 */
const mapKnown = (str) => {
  switch (str.length) {
    case 2:
      return 1;
    case 4:
      return 4;
    case 3:
      return 7;
    case 7:
      return 8;
    default:
      return undefined;
  }
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const outputs = parseInput(input);

  let total = 0;

  for (const output of outputs) {
    for (const str of output) {
      if (mapKnown(str)) total++;
    }
  }

  return total;
};

require("../utils/test")(solution, 26);
