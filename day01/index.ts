import { readFile } from 'node:fs/promises';
import path from 'node:path';

const fileContent = await readFile(path.join('day01', 'input.txt'), 'utf-8');

const lefts: Array<number> = [];
const rights: Array<number> = [];

for (const line of fileContent.split('\n')) {
  const [, left, right] = /^(\d+)\s+(\d+)$/.exec(line)!;
  lefts.push(parseInt(left, 10));
  rights.push(parseInt(right, 10));
}

const sortedLefts = lefts.sort((a, b) => a - b);
const sortedRights = rights.sort((a, b) => a - b);

let sumOfDifferences = 0;
for (let i = 0; i < sortedLefts.length; i++) {
  const left = sortedLefts[i];
  const right = sortedRights[i];

  sumOfDifferences += Math.abs(right - left);
}

console.log('[Part1]:', sumOfDifferences);

const rightsGrouped = Object.groupBy(
  rights.map((right) => ({ value: right })),
  (right) => right.value
);

let result2 = 0;

for (const left of lefts) {
  result2 += left * (rightsGrouped[left]?.length ?? 0);
}

console.log('[Part2]:', result2);
