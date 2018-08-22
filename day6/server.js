const net = require('net');
const fs = require('fs');
const port = 5000;
const chatLogFile = __dirname + '/chat.log';
let clientArr = [];
let clientId = 0;

let server = net.createServer(client => {
    //makes it so each client has a unique id:
    clientId++;
    client.nickname = "Client" + clientId;
    let clientName = client.nickname;

    //pushes all clients to an array so we can loop over it later:
    clientArr.push(client);

    //tells the server that a client joined the chat:
    console.log(clientName + ' joined the chat.');

    //welcomes the client to the chat:
    client.write("Welcome to Celie's chat!\n");

    //tells all clients that someone has joined the chat
    sendMessage(clientName, clientName + ' joined the chat.\n');

    //if the client has an error, it will be displayed
    client.on('error', error => {
        console.log('Uh oh! There was an error with the client!', error.message);
    });

    //if a client disconnects, it sends a message to all other clients:
    client.on('end', () => {

        let message = clientName + ' left the chat\n';

        process.stdout.write(message);

        removeClient(client);

        sendMessage(clientName, message);
    });

    //if a client writes a message, it sends it to all other clients:
    client.on('data', data => {

        let message = clientName + ': ' + data.toString();

        sendMessage(clientName, message);

        process.stdout.write(message);
    });
});


//sends message to all clients except for the client that sent the message:
function sendMessage(from, message) {
    if (clientArr.length === 0) {
        process.stdout.write('No one to chat with but yourself :(');
        return;
    }

    clientArr.forEach((client, index, array) => {
        if(client.nickname !== from)
            client.write(message);
    });

    fs.appendFile(chatLogFile, message, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log('Chat log file was saved');
    })
}


//removes a client from the array when they disconnect from the server:
function removeClient(client) {
    clientArr.splice(clientArr.indexOf(client), 1);
}

//if the server has an error, there will be a message:
server.on('error', error => {
    console.log("Uh oh! There was an error with the server!", error.message);
});


server.listen(port,() => {
    console.log("Server listening at http://localhost:" + port);
});