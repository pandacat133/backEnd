const fs = require('fs');
const server = require('http').createServer();

let port = process.env.PORT || 8080;
let fileName = './myBigFile.txt';

server.on('request', (req,res) => {
    const fileStreamHandle = fs.createReadStream(fileName);
    fileStreamHandle.pipe(res);
});

server.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});