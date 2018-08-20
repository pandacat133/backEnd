const https = require('https');
const fs = require('fs');

let options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: '/wiki/George_Washington',
    method: 'GET'
};

let req = https.request(options, response => {
    let responseBody = '';

    console.log('Response from server started');
    console.log(`Server status: ${response.statusCode}`);
    console.log('Response Headers: %j', response.headers);

    response.setEncoding('utf8');

    response.once('data', chunk => {
        console.log(chunk);
    });

    response.on('data', chunk => {
        console.log(`--chunk-- ${chunk.length}`);
        responseBody += chunk;
    });

    response.on('end', () => {
        fs.writeFile('george-washington.txt', responseBody, err => {
            if(err) throw err;
            console.log('File Downloaded');
        });
    });
});

req.end();