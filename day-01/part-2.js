// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let count = 0;

  for (let i = 3; i < input.length; i++)
    if (parseInt(input[i]) > parseInt(input[i - 3])) count++;

  return count;
};

const fixture = {
  sample: [199, 200, 208, 210, 200, 207, 240, 269, 260, 263],
  expected: 5,
};

require("../utils/test")(solution, fixture);
