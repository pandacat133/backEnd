const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('myCookie', 'myValue');
    res.cookie('rememberMe', 1);
    console.log(req.cookies);
    res.send('Hello World');
});

app.listen(3000, () => {
    'Listening on port 3000';
});