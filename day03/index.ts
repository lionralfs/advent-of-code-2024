import { readFile } from 'node:fs/promises';
import path from 'node:path';

const fileContent = await readFile(path.join('day03', 'input.txt'), 'utf-8');

const part1 = [...fileContent.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].reduce((acc, match) => {
  const [_, a, b] = match;
  return acc + Number(a) * Number(b);
}, 0);

console.log('[Part1]:', part1);

let mode: 'enabled' | 'disabled' = 'enabled';

let workingString = fileContent;
let match;

let part2 = 0;

while ((match = workingString.match(/mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/)) && match.index !== undefined) {
  if (match[0] === 'do()') {
    mode = 'enabled';
  } else if (match[0] === "don't()") {
    mode = 'disabled';
  } else {
    const [_, a, b] = match;
    part2 += mode === 'enabled' ? Number(a) * Number(b) : 0;
  }
  workingString = workingString.slice(match.index + match[0].length);
}
console.log('[Part1]:', part2);
