//How to create a child process:

const { spawn } = require('child_process');
const child = spawn('find', ['.','-type', 'f']);

child.stdout.on('data', (data) => {
   console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
});

child.on('exit', function (code, signal) {
   console.log(`child process exited with code ${code}, signal ${signal}`);
});