const net = require('net');

//This stuff happens when the client connects to the server:
let client = net.createConnection({port: 5000}, () => {
    console.log('CLIENT: Client connected.');
});

//translates messages from binary to normal characters
client.setEncoding('utf8');

process.stdin.pipe(client);

//This is the thing that allows the client to receive messages from the server:
client.on('data', data => {
    console.log(data);
});