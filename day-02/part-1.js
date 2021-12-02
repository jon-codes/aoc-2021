// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let x = 0,
    y = 0;

  for (const line of input) {
    const parsed = line.split(" ");
    const dir = parsed[0];
    const mag = parseInt(parsed[1]);

    switch (dir) {
      case "forward":
        x = x + mag;
        break;
      case "up":
        y = y - mag;
        break;
      case "down":
        y = y + mag;
        break;
    }
  }

  return x * y;
};

require("../utils/test")(solution, 150);
