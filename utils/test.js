const { readFileSync } = require("fs");
const { join, dirname } = require("path");
const test = require("ava").default;

const loadFixture = (dir, src) =>
  readFileSync(join(dir, src), "utf-8").trim().split("\n");

const sampleTest = (t, solution, sample, expected) => {
  const result = solution(sample);

  t.is(result, expected);
};

sampleTest.title = () => "sample";

const inputTest = (t, solution, input) => {
  const result = solution(input);

  t.log("Answer:", result);
  t.pass();
};

inputTest.title = () => "input";

const testSolution = (solution, { sample, expected }) => {
  const testDir = dirname(test.meta.file);
  const input = loadFixture(testDir, "input.txt");

  test("sample", sampleTest, solution, sample, expected);
  test("input", inputTest, solution, input);
};

module.exports = testSolution;
