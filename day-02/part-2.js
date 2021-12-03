// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let x = 0;
  let d = 0;
  let aim = 0;

  for (const line of input) {
    const [dir, strMag] = line.split(" ");
    const mag = parseInt(strMag);

    switch (dir) {
      case "up":
        aim -= mag;
        break;
      case "down":
        aim += mag;
        break;
      case "forward":
        x += mag;
        d += aim * mag;
        break;
    }
  }

  return x * d;
};

const fixture = {
  sample: ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"],
  expected: 900,
};

require("../utils/test")(solution, fixture);
