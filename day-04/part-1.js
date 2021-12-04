// @ts-check

/**
 *
 * @param {number[][]} m
 * @returns {number[][]}
 */
const transpose = (m) => m[0].map((x, i) => m.map((x) => x[i]));

/**
 *
 * @param {string[]} input
 * @returns {{numbers: number[], boards: number[][][]}}
 */
const parseInput = (input) => {
  input = input.filter((line) => line !== "");

  const numbers = input
    .shift()
    .split(",")
    .map((str) => parseInt(str));

  // parse rows
  const rows = input.map((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((str) => parseInt(str))
  );

  // chunk boards
  let boards = [];

  for (let i = 0; i < rows.length; i += 5) {
    boards.push(rows.slice(i, i + 5));
  }

  return { numbers, boards };
};

/**
 *
 * @param {(number)[][]} board
 * @returns {{win: boolean, score: number}}
 */
const checkWin = (board) => {
  let win = false;
  let score = 0;

  for (let row = 0; row < 5; row++) {
    let rowCount = 0;

    for (let col = 0; col < 5; col++) {
      const cell = board[row][col];

      if (cell === undefined) {
        rowCount++;
      } else {
        score += cell;
      }
    }

    if (rowCount === 5) win = true;
  }

  return { win, score };
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const { numbers, boards } = parseInput(input);

  let score;
  let win = false;

  for (const number of numbers) {
    for (const board of boards) {
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (board[row][col] === number) board[row][col] = undefined;
        }
      }

      const transposed = transpose(board);

      const { win: boardWin, score: boardScore } = checkWin(board);

      if (boardWin) {
        win = true;
        score = boardScore;
        break;
      }

      const { win: transposedWin, score: transposedScore } =
        checkWin(transposed);

      if (transposedWin) {
        win = true;
        score = transposedScore;
        break;
      }
    }

    if (win) {
      return score * number;
    }
  }
};

require("../utils/test")(solution, 4512);
