// @ts-check

const { join } = require("path"),
  { createReadStream } = require("fs"),
  { createInterface } = require("readline");

/**
 *
 * @param {number[]} arr
 * @returns
 */
const sum = (arr) => arr.reduce((acc, x) => acc + x, 0);

(() => {
  const rl = createInterface({
    input: createReadStream(join(__dirname, "input.txt")),
    crlfDelay: Infinity,
  });

  let prev,
    count = 0,
    lineNum = 0,
    window = [];

  rl.on("line", (line) => {
    window[lineNum % 3] = parseInt(line);

    if (lineNum >= 3) {
      const windowSum = sum(window);

      if (prev && windowSum > prev) count++;

      prev = windowSum;
    }

    lineNum++;
  });

  rl.on("close", () => {
    console.log("solution:", count);
  });
})();
