const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.get('/test', (req, res) => {
    res.status(500).send({'message':'An error has occurred'});
});

let server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = server;