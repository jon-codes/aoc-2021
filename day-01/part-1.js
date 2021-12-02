// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let prev,
    count = 0;

  for (const line of input) {
    const value = parseInt(line);

    if (prev && value > prev) count++;

    prev = value;
  }

  return count;
};

require("../utils/test")(solution, 7);
