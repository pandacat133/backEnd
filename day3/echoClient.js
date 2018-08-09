const net = require('net');        // Client Code  .
const client = net.createConnection({ port: 8124 },
    () => {

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        var util = require('util');
        console.log('connected to server!');
        process.stdin.on('data', function (text) {
            //console.log('received data:', util.inspect(text));
            //console.log('received data:' + '\'text\'');
            if (text === 'quit\n') {
                done();
            }
            else if (text === 'plantSeed\n') {
                plantSeed();
            }
            else if (text === 'water\n') {
                water();
            }
            else if (text === 'harvest\n') {
                harvest();
            }
            else if (text === 'bugAttack\n') {
                bugAttack();
            }
            client.write('1 ... Anyone there!\r\n');
            client.write('2 ... What did you say!\r\n');
        });
    });
client.on('data', (data) => {
    console.log("Msg from server:" + data.toString());
    client.end();
});
client.on('end', () => {
    console.log('End of Message');
});