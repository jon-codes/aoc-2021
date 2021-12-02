// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let aim = 0,
    x = 0,
    y = 0;

  for (const line of input) {
    const parsed = line.split(" ");
    const dir = parsed[0];
    const mag = parseInt(parsed[1]);

    switch (dir) {
      case "forward":
        x = x + mag;
        y = y + aim * mag;
        break;
      case "up":
        aim = aim - mag;
        break;
      case "down":
        aim = aim + mag;
        break;
    }
  }

  return x * y;
};

require("../utils/test")(solution, 900);
