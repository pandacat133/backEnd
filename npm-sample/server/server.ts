const express = require('express');
const app = express();

const messages = ['hi','hello','how are you?','what is your name?'];

app.get('/messages', (req, res) => {
    res.send(`Here are your messages: ${messages}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});