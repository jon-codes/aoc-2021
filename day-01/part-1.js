// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let count = 0;

  for (let i = 1; i < input.length; i++)
    if (parseInt(input[i]) > parseInt(input[i - 1])) count++;
  debugger;
  return count;
};

const fixture = {
  sample: [
    "199",
    "200",
    "208",
    "210",
    "200",
    "207",
    "240",
    "269",
    "260",
    "263",
  ],
  expected: 7,
};

require("../utils/test")(solution, fixture);
