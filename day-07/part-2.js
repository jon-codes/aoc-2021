// @ts-check
/**
 *
 * @param {string[]} input
 * @returns {number[]}
 */
const parseInput = (input) => input[0].split(",").map((str) => parseInt(str));

/**
 *
 * @param {number[]} crabs
 * @returns {number[]}
 */
const buildCounts = (crabs) =>
  crabs.reduce(
    (acc, crab) => {
      acc[crab]++;
      return acc;
    },
    [...Array(Math.max(...crabs) + 1).fill(0)]
  );

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const crabs = parseInput(input);
  const counts = buildCounts(crabs);

  const totals = counts.reduce(
    (acc, _, pos) => [
      ...acc,
      counts.reduce(
        (acc, qty, sub) =>
          acc + ((Math.abs(sub - pos) * (Math.abs(sub - pos) + 1)) / 2) * qty,
        0
      ),
    ],
    []
  );

  return Math.min(...totals);
};

require("../utils/test")(solution, 168);
