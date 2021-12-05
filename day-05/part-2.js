// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number[][][]}
 */
const parseInput = (input) =>
  input.map((line) =>
    line
      .split(" -> ")
      .map((str) => str.split(",").map((point) => parseInt(point)))
  );

/**
 *
 * @param {number[][][]} lines
 * @returns {number[][]}
 */
const buildGraph = (lines) => {
  const [x, y] = lines.reduce(
    ([x, y], [[x1, y1], [x2, y2]]) => [
      Math.max(x, x1, x2),
      Math.max(y, y1, y2),
    ],
    [0, 0]
  );

  return [...Array(y + 1).fill(0)].map(() => [...Array(x + 1).fill(0)]);
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const lines = parseInput(input);
  const graph = buildGraph(lines);

  lines.forEach(([[x1, y1], [x2, y2]]) => {
    const [dx, dy] = [
      [x1, x2],
      [y1, y2],
    ].map(([a, b]) => (a === b ? 0 : a < b ? 1 : -1));

    for (let x = x1, y = y1; x != x2 + dx || y != y2 + dy; x += dx, y += dy)
      graph[y][x]++;
  });

  return graph.reduce(
    (acc, row) =>
      acc + row.reduce((acc, cell) => (cell > 1 ? acc + 1 : acc), 0),
    0
  );
};

require("../utils/test")(solution, 12);
