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

require("../utils/test")(solution, 7);
