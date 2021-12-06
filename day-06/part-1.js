// @ts-check

/**
 *
 * @param {string[]} input
 * @return {number[]}
 */
const parseInput = (input) => input[0].split(",").map((n) => parseInt(n));

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let fishes = parseInput(input);

  const counts = fishes.reduce(
    (acc, day) => {
      acc[day]++;
      return acc;
    },
    [...Array(9).fill(0)]
  );

  for (let i = 0; i < 80; i++) {
    const current = [...counts];

    for (let day = 0; day < 9; day++)
      switch (day) {
        case 6:
          counts[day] = current[0] + current[7];
          break;
        case 8:
          counts[day] = current[0];
          break;
        default:
          counts[day] = current[day + 1];
          break;
      }
  }

  return counts.reduce((acc, count) => acc + count, 0);
};

require("../utils/test")(solution, 5_934);
