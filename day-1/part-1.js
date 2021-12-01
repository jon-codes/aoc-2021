// @ts-check

const { join } = require("path"),
  { createReadStream } = require("fs"),
  { createInterface } = require("readline");

(() => {
  const rl = createInterface({
    input: createReadStream(join(__dirname, "input.txt")),
    crlfDelay: Infinity,
  });

  let prev,
    count = 0;

  rl.on("line", (line) => {
    const value = parseInt(line);

    if (prev && value > prev) count++;

    prev = value;
  });

  rl.on("close", () => {
    console.log("solution:", count);
  });
})();
