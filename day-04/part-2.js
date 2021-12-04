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
 * @returns {boolean}
 */
const checkWin = (board) => {
  let win = false;

  for (let row = 0; row < 5; row++) {
    let rowCount = 0;

    for (let col = 0; col < 5; col++)
      if (board[row][col] === undefined) rowCount++;

    if (rowCount === 5) win = true;
  }

  return win;
};

/**
 *
 * @param {(number)[][]} board
 * @returns {number}
 */
const scoreBoard = (board) => {
  let score = 0;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = board[row][col];

      if (cell) score += cell;
    }
  }

  return score;
};

/**
 *
 * @param {string[]} input
 * @returns {number}
 */
const solution = (input) => {
  const { numbers, boards } = parseInput(input);

  let wins = [];

  for (const number of numbers) {
    for (const [boardIndex, board] of boards.entries()) {
      if (!wins.includes(boardIndex)) {
        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 5; col++) {
            if (board[row][col] === number) board[row][col] = undefined;
          }
        }

        if (checkWin(board)) {
          if (!wins.includes(boardIndex)) wins.push(boardIndex);
          continue;
        }

        const transposed = transpose(board);

        if (checkWin(transposed)) {
          if (!wins.includes(boardIndex)) wins.push(boardIndex);
          continue;
        }
      }
    }

    if (wins.length === boards.length) {
      const lastBoard = wins[boards.length - 1];

      const score = scoreBoard(boards[lastBoard]);

      return score * number;
    }
  }
};

require("../utils/test")(solution, 1924);
