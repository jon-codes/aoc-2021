const { argv } = require("process");
const {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
  createWriteStream,
} = require("fs");
const { resolve } = require("path");
const { request } = require("https");

const sessionPath = resolve(__dirname, "..", ".session");
const session = existsSync(sessionPath)
  ? readFileSync(sessionPath, "utf-8").trim()
  : undefined;

let dayArg = argv[2];
let day;

if (dayArg) {
  day = parseInt(dayArg);

  if (day < 1 || day > 25 || isNaN(day)) {
    console.log(
      "\x1b[31mError:",
      "\x1b[0m",
      `"${dayArg}" is not a valid day (between 1 and 25)!`
    );
    process.exit(1);
  }

  console.log("Creating day:", day);
}

if (!day) {
  const existing = readdirSync(resolve(__dirname, ".."), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory() && dirent.name.match(/^day-/))
    .map((dirent) => parseInt(dirent.name.substring(4)));

  day = existing.length ? Math.max(...existing) + 1 : 1;

  if (day > 25) {
    console.log(
      "\x1b[31mError:",
      "\x1b[0m",
      `This would generate Dec 26, but that doesn't make sense`
    );
    process.exit(1);
  }

  console.log("Defaulting to day:", day);
}

const year = 2021;
const estOffset = -5 * 60;
const timestamp = new Date(year, 11, day).getTime() - estOffset;

if (Date.now() < timestamp) {
  console.log("\x1b[31mError:", "\x1b[0m", `It's not Dec ${day} yet`);
  process.exit(1);
}

const paddedDay = day < 10 ? "0" + day : day.toString();

mkdirSync(resolve(__dirname, "..", `day-${paddedDay}`));

for (const file of ["part-1.js", "part-2.js"])
  copyFileSync(
    resolve(__dirname, "template"),
    resolve(__dirname, "..", `day-${paddedDay}`, file)
  );

const cacheDir = resolve(__dirname, "..", ".cache");
const cachePath = resolve(__dirname, "..", ".cache", `day-${paddedDay}`);

if (existsSync(cachePath)) {
  console.log("Found cached input data ...");

  copyFileSync(
    cachePath,
    resolve(__dirname, "..", `day-${paddedDay}`, "input.txt")
  );
} else {
  if (!existsSync(cacheDir)) mkdirSync(cacheDir);

  const file = createWriteStream(cachePath);

  request(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: { cookie: `session=${session}`, accept: "text/plain" },
    },
    (response) => {
      response.pipe(file);

      response.on("close", () => {
        copyFileSync(
          cachePath,
          resolve(__dirname, "..", `day-${paddedDay}`, "input.txt")
        );
      });
    }
  ).end();
}
