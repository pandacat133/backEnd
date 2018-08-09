const fs = require('fs');
const server = require('http').createServer();

let fileName = './myBigFlie.txt';

server.on('request', (req, res) => {
    const fileStremHandle = fs.createReadStream(fileName);
    fileStremHandle.pipe(res);
});

server.listen(8080);