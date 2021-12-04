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

require("../utils/test")(solution, 198);
