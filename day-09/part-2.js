// @ts-check

/**
 *
 * @param {string[]} input
 * @returns {number[][]}
 */
const parseInput = (input) => {
  const arr = [];
  for (const [index, line] of input.entries()) {
    arr[index] = line.split("").map((sub) => parseInt(sub));
  }
  return arr;
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const matrix = parseInput(input);
  const maxRow = matrix.length - 1;
  const maxCol = matrix[0].length - 1;

  const lowPoints = [];
  // let total = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const adj = [];

      if (row === 0) {
        adj.push(matrix[row + 1][col]);
      } else if (row === maxRow) {
        adj.push(matrix[row - 1][col]);
      } else {
        adj.push(matrix[row - 1][col], matrix[row + 1][col]);
      }

      if (col === 0) {
        adj.push(matrix[row][col + 1]);
      } else if (col === maxCol) {
        adj.push(matrix[row][col - 1]);
      } else {
        adj.push(matrix[row][col - 1], matrix[row][col + 1]);
      }

      if (matrix[row][col] < Math.min(...adj)) {
        lowPoints.push({ row, col });
      }
    }
  }

  /**
   *
   * @param {{row: number, col: number}[]} points
   */
  function iterate(points) {
    const prev = [...points];
    const adj = [...points];

    for (const { row, col } of points) {
      if (row === 0) {
        if (matrix[row + 1][col] !== 9) adj.push({ row: row + 1, col });
        // adj.push(matrix[row + 1][col]);
      } else if (row === maxRow) {
        if (matrix[row - 1][col] !== 9) adj.push({ row: row - 1, col });
        // adj.push(matrix[row - 1][col]);
      } else {
        if (matrix[row + 1][col] !== 9) adj.push({ row: row + 1, col });
        if (matrix[row - 1][col] !== 9) adj.push({ row: row - 1, col });
      }

      if (col === 0) {
        if (matrix[row][col + 1] !== 9) adj.push({ row, col: col + 1 });
      } else if (col === maxCol) {
        if (matrix[row][col - 1] !== 9) adj.push({ row, col: col - 1 });
      } else {
        if (matrix[row][col + 1] !== 9) adj.push({ row, col: col + 1 });
        if (matrix[row][col - 1] !== 9) adj.push({ row, col: col - 1 });
      }
    }

    const unique = [
      ...new Map(adj.concat(prev).map((o) => [JSON.stringify(o), o])).values(),
    ];

    return JSON.stringify(prev) === JSON.stringify(unique)
      ? unique
      : iterate(unique);
  }

  let sizes = [];

  for (const point of lowPoints) {
    sizes.push(iterate([point]).length);
  }

  const topSizes = sizes.sort((a, b) => b - a).slice(0, 3);

  return topSizes.reduce((acc, size) => acc * size, 1);
};

require("../utils/test")(solution, 1134);
