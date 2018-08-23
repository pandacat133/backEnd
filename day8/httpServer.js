let http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {

    if(req.url === '/') {
        fs.readFile('./public/index.html', 'utf8', (err, html) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(html);
        });
    }
    else if(req.url.match(/.css$/)){
        let cssPath = path.join(__dirname, 'public', req.url);
        let fileStream = fs.createReadStream(cssPath, 'utf8');
        res.writeHead(200, {'Content-type': 'text/css'});
        fileStream.pipe(res);
    }
    else if(req.url.match(/.jpg$/)){
        let imgPath = path.join(__dirname, 'public', req.url);
        let imgStream = fs.createReadStream(imgPath);
        res.writeHead(200, {'Content-type': 'image/jpg'})
        imgStream.pipe(res);
    }
    else{
        res.writeHead(404, {'Content-type':'text/plain'});
        res.end('404 file not found');
    }
}).listen(3000);

console.log(`listening on port ${server.address().port}`);