let http = require('http');

let server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>HTML Response</title>
            </head>
            <body>
                <h1>Serving HTML</h1>
                <p>${req.url}</p>
                <p>${req.method}</p>
            </body>
        </html>
    `);

}).listen(3000);

console.log(`listening on port ${server.address().port}`);