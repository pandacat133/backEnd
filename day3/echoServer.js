const net = require('net');  // echoServer.js
const port = process.env.PORT || 8123;

const server = net.createServer((socket) => {
    socket.write('Welcome to Echo Server\n');
    socket.on('data', (chunk) => {
        console.log('Server receives :' + chunk );
        socket.write(`Echo from server :`)
        socket.write(chunk);
    });
    socket.on('end', () =>{
        console.log('Client quits');
    });
});

server.listen(port, () => {
    console.log(`server is up. Listening on port: ${port}`);
});
