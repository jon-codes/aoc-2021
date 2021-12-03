// @ts-check

/**
 * @param {string[]} items
 * @param {number} position
 * @returns {number[]}
 */
const findCommonBits = (items, position) => {
  const mcb =
    items.reduce((acc, item) => (item[position] === "1" ? acc + 1 : acc), 0) >=
    items.length / 2
      ? 1
      : 0;

  return [mcb, 1 - mcb];
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let y = "";
  let e = "";

  for (let position = 0; position < input[0].length; position++) {
    const [mcb, lcb] = findCommonBits(input, position);

    y = y + mcb;
    e = e + lcb;
  }

  return parseInt(y, 2) * parseInt(e, 2);
};

const fixture = {
  sample: [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ],
  expected: 198,
};

require("../utils/test")(solution, fixture);
