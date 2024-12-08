import { readFile } from 'node:fs/promises';
import path from 'node:path';

const fileContent = await readFile(path.join('day05', 'input.txt'), 'utf-8');

const pageRules: Array<[string, string]> = fileContent
  .split('\n\n')[0]
  .split('\n')
  .map((line) => {
    return line.split('|') as [string, string];
  });
const pageRulesByKey = Object.groupBy(pageRules, (rule) => rule[0]);
const updates = fileContent
  .split('\n\n')[1]
  .split('\n')
  .map((line) => line.split(','));

function isInOrder(update: Array<string>): boolean {
  const seen = new Set<string>();
  for (const num of update) {
    const befores = pageRulesByKey[num];
    if (befores) {
      for (const before of befores) {
        if (seen.has(before[1])) {
          return false;
        }
      }
    }
    seen.add(num);
  }
  return true;
}

let part1 = 0;
const incorrects: Array<Array<string>> = [];
for (const update of updates) {
  if (isInOrder(update)) {
    const middle = update[Math.floor(update.length / 2)];
    part1 += parseInt(middle);
  } else {
    incorrects.push(update);
  }
}
console.log('[Part1]', part1);

function fixOrdering(update: Array<string>): Array<string> {
  const result = [...update];
  const seenAtIndex = new Map<string, number>();
  for (let i = 0; i < update.length; i++) {
    const num = update[i];
    const befores = pageRulesByKey[num];
    if (befores) {
      for (const before of befores) {
        const seenIndex = seenAtIndex.get(before[1]);
        if (seenIndex !== undefined) {
          result[seenIndex] = num;
          result[i] = before[1];
          return fixOrdering(result);
        }
      }
    }
    seenAtIndex.set(num, i);
  }
  return result;
}

let part2 = 0;
for (const incorrect of incorrects) {
    const fixedOrder = fixOrdering(incorrect);
    const middle = fixedOrder[Math.floor(fixedOrder.length / 2)];
    part2 += parseInt(middle);
}
console.log('[Part2]', part2);
