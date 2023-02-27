const { spawn } = require('child_process');

// Derived from Node.js docs:
// https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
const execCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args);
    process.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    process.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    process.on('close', (code) => {
      console.log('Process exited with code', code);
      if (code > 0) {
        reject(code);
      } else {
        resolve();
      }
    });
  });
};

module.exports = execCommand;
