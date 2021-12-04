# aoc-2021

[Advent of Code 2021](https://adventofcode.com/2021)

Solutions in Javascript (Node 16.13.0)

## Generate new day

```bash
npm run generate   # generates next day
npm run generate 1 # generates a specific day
```

## Test all days

```bash
npm test
```

## Test single day

```bash
npm test -- ./day-01/*
```

## Test single part

```bash
npm test -- ./day-01/part-1.js
```

## Test single part (sample only)

```bash
npm test -- ./day-01/part-1.js --match='sample'
```

## Test single part (input only)

```bash
npm test -- ./day-01/part-1.js --match='input'
```

## Debugging tests in VS Code

1. Open the Command Palette (<kbd>F1</kbd> or <kbd>cmd + shift + p</kbd>or <kbd>ctl + shift + p</kbd>)
2. Run `Debug: JavaScript Debug Terminal`
3. Run a test command from the Javascript Debug Terminal

Create breakpoints using your editor or the `debugger` statement in the source code.
