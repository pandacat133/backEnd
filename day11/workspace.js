const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('myCookie', 'myValue');
    res.cookie('rememberMe', 1, {expires: new Date(Date.now() + 90000),
                                 httpOnly: true,
                                 secure: true
                                });
    res.cookie('rememberMe', 1, {maxAge: 90000,
                                 httpOnly: true,
                                 secure: true
                                });
    console.log(req.cookies);
    res.send('Hello World');
});

app.listen(3000, () => {
    'Listening on port 3000';
});