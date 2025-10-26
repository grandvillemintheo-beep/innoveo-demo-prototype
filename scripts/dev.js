#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const processes = [
  {
    name: 'backend',
    command: 'npm',
    args: ['run', 'start:dev'],
    options: { cwd: path.resolve(__dirname, '..', 'backend'), stdio: 'inherit', shell: process.platform === 'win32' }
  },
  {
    name: 'frontend',
    command: 'npm',
    args: ['run', 'dev', '--', '--host', '0.0.0.0', '--port', '4173'],
    options: { cwd: path.resolve(__dirname, '..', 'frontend'), stdio: 'inherit', shell: process.platform === 'win32' }
  }
];

const children = [];
let shuttingDown = false;

const shutdown = (code) => {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
};

for (const proc of processes) {
  const child = spawn(proc.command, proc.args, proc.options);
  children.push(child);

  child.on('error', (error) => {
    console.error(`[${proc.name}] failed to start:`, error);
    shutdown(1);
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      console.log(`[${proc.name}] exited with signal ${signal}`);
    } else {
      console.log(`[${proc.name}] exited with code ${code}`);
    }
    if (!shuttingDown && code !== 0) {
      shutdown(code ?? 1);
    }
  });
}

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, terminating child processes...');
  shutdown(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, terminating child processes...');
  shutdown(0);
});
