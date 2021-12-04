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
  let co2Items = [...input];
  let oxyItems = [...input];

  for (let position = 0; position < input[0].length; position++) {
    if (co2Items.length > 1) {
      const [mcb] = findCommonBits(co2Items, position);

      co2Items = co2Items.filter((line) => parseInt(line[position]) === mcb);
    }

    if (oxyItems.length > 1) {
      const [, lcb] = findCommonBits(oxyItems, position);

      oxyItems = oxyItems.filter((line) => parseInt(line[position]) === lcb);
    }

    if (co2Items.length === 1 && oxyItems.length === 1) break;
  }

  return parseInt(co2Items[0], 2) * parseInt(oxyItems[0], 2);
};

require("../utils/test")(solution, 230);
