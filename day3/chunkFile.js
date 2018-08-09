const fs = require('fs');
const server = require('http').createServer();

let fileName = './myBigFlie.txt';

server.on('request', (req, res) => {
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

server.listen(8080);