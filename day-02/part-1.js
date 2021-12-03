// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  let x = 0;
  let d = 0;

  for (const line of input) {
    const [dir, strMag] = line.split(" ");
    const mag = parseInt(strMag);

    switch (dir) {
      case "up":
        d -= mag;
        break;
      case "down":
        d += mag;
        break;
      case "forward":
        x += mag;
        break;
    }
  }

  return x * d;
};

const fixture = {
  sample: ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"],
  expected: 150,
};

require("../utils/test")(solution, fixture);
