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

  let total = 0;

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
        total += matrix[row][col] + 1;
      }
    }
  }

  return total;
};

require("../utils/test")(solution, 15);
