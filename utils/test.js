const { readFileSync } = require("fs");
const { join, dirname } = require("path");
const test = require("ava").default;

const loadFixture = (dir, src) =>
  readFileSync(join(dir, src), "utf-8").trim().split("\n");

const sampleTest = (t, solution, expected) => {
  const testDir = dirname(test.meta.file);
  const sample = loadFixture(testDir, "/fixtures/sample.txt");

  const result = solution(sample);

  t.is(result, expected);
};

sampleTest.title = () => "sample";

const inputTest = (t, solution) => {
  const testDir = dirname(test.meta.file);
  const input = loadFixture(testDir, "/fixtures/input.txt");

  const result = solution(input);

  t.log("Answer:", result);
  t.pass();
};

inputTest.title = () => "title";

const testSolution = (solution, expected) => {
  test("sample", sampleTest, solution, expected);
  test("input", inputTest, solution);
};

module.exports = testSolution;
