const os = require('os');

const cpuCount = os.cpus().length;
console.log(`number of CPUs: ${cpuCount}`);