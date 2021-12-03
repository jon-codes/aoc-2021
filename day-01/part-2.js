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

require("../utils/test")(solution, 5);
