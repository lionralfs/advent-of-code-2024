import { readFile } from 'node:fs/promises';
import path from 'node:path';

const fileContent = await readFile(path.join('day02', 'input.txt'), 'utf-8');

const reports: Array<Array<number>> = [];

for (const line of fileContent.split('\n')) {
  const levels = line.split(' ').map((n) => parseInt(n, 10));
  reports.push(levels);
}

let safeReportsCount = 0;

for (const report of reports) {
  isSafe(report) && safeReportsCount++;
}

console.log('[Part1]:', safeReportsCount);

let safeReportsCountPart2 = 0;

function isSafe(report: Array<number>): boolean {
  let mode: 'inc' | 'dec' = 'inc';
  let prev = report[0];
  for (let i = 1; i < report.length; i++) {
    const current = report[i];

    const diff = Math.abs(current - prev);

    if (diff > 3 || diff < 1) {
      return false;
    }

    if (i === 1) {
      // only set the mode once
      mode = current > prev ? 'inc' : 'dec';
    } else if (mode === 'inc' && current < prev) {
      return false;
    } else if (mode === 'dec' && current > prev) {
      return false;
    }
    prev = current;
  }
  return true;
}

function isSafeWithRemoval(report: Array<number>): boolean {
  const safe = isSafe(report);
  if (safe) return true;

  for (let i = 0; i < report.length; i++) {
    const without = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(without)) {
      return true;
    }
  }
  return false;
}

for (const report of reports) {
  isSafeWithRemoval(report) && safeReportsCountPart2++;
}

console.log('[Part2]:', safeReportsCountPart2);
