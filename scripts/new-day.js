const { argv } = require("process");
const {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  copyFileSync,
  createWriteStream,
} = require("fs");
const { resolve } = require("path");
const { request } = require("http");

const sessionPath = resolve(__dirname, "..", ".session");
const session = existsSync(sessionPath)
  ? readFileSync(sessionPath, "utf-8").trim()
  : undefined;

let dayArg = argv[2];
let day;

if (dayArg) {
  day = parseInt(dayArg);

  if (day < 1 || day > 25 || isNaN(day)) throw new Error("Invalid day");

  console.log("Creating day:", day);
}

if (!day) {
  const existing = readdirSync(resolve(__dirname, ".."), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory() && dirent.name.match(/^day-/))
    .map((dirent) => parseInt(dirent.name.substring(4)));

  day = existing.length ? Math.max(...existing) + 1 : 1;

  if (day > 25) throw new Error("Invalid day");

  console.log("Defaulting to day:", day);
}

const paddedDay = day < 10 ? "0" + day : day.toString();

mkdirSync(resolve(__dirname, "..", `day-${paddedDay}`));

for (const file of ["part-1.js", "part-2.js"])
  copyFileSync(
    resolve(__dirname, "template"),
    resolve(__dirname, "..", `day-${paddedDay}`, file)
  );

// writeFileSync(resolve(__dirname, "..", `day-${paddedDay}`, "input.txt"), "");

const cachePath = resolve(__dirname, "..", ".cache", `day-${paddedDay}`);

if (existsSync(cachePath)) {
  console.log("Found cached input data ...");

  copyFileSync(
    cachePath,
    resolve(__dirname, "..", `day-${paddedDay}`, "input.txt")
  );
} else {
  try {
    request(
      {
        host: "https://adventofcode.com",
        path: `/2021/day/${day}/input`,
        headers: {
          Cookie: `session=${session}`,
        },
      },
      (response) => {
        const fileStream = createWriteStream(cachePath);

        // const str = "";

        response.on("data", (chunk) => {
          fileStream.write(chunk);
        });

        // response.on("end", () => console.log(str));
      }
    ).end();

    throw new Error("Error while fetching data!");
  } catch (err) {
    writeFileSync(
      resolve(__dirname, "..", `day-${paddedDay}`, "input.txt"),
      ""
    );
  }
}

// if (existsSync(resolve(__dirname, "..", ".cache", `day-${paddedDay}`)))
//   try {
//     console.log("Checking cache ...");
//     session = readFileSync(
//       resolve(__dirname, "..", ".cache", `day-${paddedDay}`)
//     );
//   } catch (err) {
//     console.log("File does not exist in cache");
//   }

// let cachedInput;

// const cachedInput =

// const existingDays = readdirSync(resolve(__dirname, ".."), {
//   withFileTypes: true,
// })
//   .filter((dirent) => dirent.isDirectory() && dirent.name.match(/day-/))
//   .map((dirent) => parseInt(dirent.name.substring(4)));

// if (!day) {
//   day = 1;
// }

// console.log(existingDays);

// console.log(directories);
