#!/usr/bin/env node
/**
 * Cross-platform Python runner.
 * Automatically resolves 'python3', 'python', or 'py' depending on environment and OS.
 */

import { spawnSync } from 'node:child_process';
import process from 'node:process';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/run-python.mjs <script.py> [args...]');
  process.exit(1);
}

const candidates = process.platform === 'win32'
  ? ['python', 'py', 'python3']
  : ['python3', 'python'];

let chosenCmd = null;
let cmdPrefixArgs = [];

for (const candidate of candidates) {
  try {
    const res = spawnSync(candidate, ['--version'], { stdio: 'ignore', shell: true });
    if (!res.error && res.status === 0) {
      chosenCmd = candidate;
      break;
    }
  } catch {
    // continue
  }
}

if (!chosenCmd) {
  console.error('Erro: Nenhum interpretador Python (python / python3 / py) encontrado no PATH do sistema.');
  process.exit(1);
}

const child = spawnSync(chosenCmd, [...cmdPrefixArgs, ...args], {
  stdio: 'inherit',
  shell: true
});

process.exit(child.status ?? (child.error ? 1 : 0));
