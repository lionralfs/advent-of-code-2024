import { readFile } from 'node:fs/promises';
import path from 'node:path';

const fileContent = await readFile(path.join('day04', 'input.txt'), 'utf-8');

const field = fileContent.split('\n').map((line) => line.split(''));

const next = {
  X: 'M',
  M: 'A',
  A: 'S',
} as const;

const Left = [-1, 0];
const Right = [1, 0];
const Up = [0, -1];
const Down = [0, 1];
const UpRight = [-1, 1];
const DownRight = [1, 1];
const UpLeft = [-1, -1];
const DownLeft = [1, -1];

type Direction =
  | typeof Left
  | typeof Right
  | typeof Up
  | typeof Down
  | typeof UpRight
  | typeof DownRight
  | typeof UpLeft
  | typeof DownLeft;

const directions: Direction[] = [Left, Right, Up, Down, UpRight, DownRight, UpLeft, DownLeft];

function safeHasChar(field: Array<Array<string>>, coordinates: [number, number], lookingFor: string): boolean {
  const [x, y] = coordinates;
  if (x < 0 || x >= field.length || y < 0 || y >= field[0].length) {
    return false; // out of bounds
  }

  return field[x][y] === lookingFor;
}

function hasXMAS(
  field: Array<Array<string>>,
  direction: Direction,
  start: [number, number],
  lookingFor: keyof typeof next | 'S' = 'X'
): boolean {
  const [x, y] = start;
  if (safeHasChar(field, [x, y], lookingFor)) {
    if (lookingFor === 'S') {
      return true;
    }
    return hasXMAS(field, direction, [x + direction[0], y + direction[1]], next[lookingFor]);
  }
  return false;
}

let part1 = 0;

for (let y = 0; y < field.length; y++) {
  for (let x = 0; x < field[0].length; x++) {
    for (let direction of directions) {
      if (hasXMAS(field, direction, [x, y])) {
        part1++;
      }
    }
  }
}

console.log('[Part1]:', part1);

function hasCrossedXMAS(field: Array<Array<string>>, coordinates: [number, number]): boolean {
  const [x, y] = coordinates;
  if (!safeHasChar(field, coordinates, 'A')) {
    return false;
  }

  const topLeftBottomRightDiagonalOk =
    (safeHasChar(field, [x - 1, y - 1], 'M') && safeHasChar(field, [x + 1, y + 1], 'S')) ||
    (safeHasChar(field, [x - 1, y - 1], 'S') && safeHasChar(field, [x + 1, y + 1], 'M'));

  if (!topLeftBottomRightDiagonalOk) {
    return false;
  }

  const topRightBottomLeftDiagonalOk =
    (safeHasChar(field, [x + 1, y - 1], 'M') && safeHasChar(field, [x - 1, y + 1], 'S')) ||
    (safeHasChar(field, [x + 1, y - 1], 'S') && safeHasChar(field, [x - 1, y + 1], 'M'));

  if (!topRightBottomLeftDiagonalOk) {
    return false;
  }

  return true;
}

let part2 = 0;

for (let y = 0; y < field.length; y++) {
  for (let x = 0; x < field[0].length; x++) {
    if (hasCrossedXMAS(field, [x, y])) {
      part2++;
    }
  }
}

console.log('[Part2]:', part2);
