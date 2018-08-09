const net = require('net');  //  Server Code
const server = net.createServer((socket) => {
    console.log('client connected');
    socket.on('end', () => {
        console.log('client disconnected');
    });
    //when there is a data even, print it out
    socket.on('data', (data) => {
        console.log("Msg from client:" + data.toString());
    });
    socket.write('Welcome to echo server\r\n');
    socket.pipe(socket);
});

server.on('error', (err) => {
    throw err;
});
server.listen(8124, () => {
    console.log('server is up');
});