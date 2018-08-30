const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'rawr',
    resave: 'false',
    saveUninitialized: 'false',
    cookie: {maxAge: 10000}
}));
app.use((req, res, next) => {
    console.log('Hello World');
    next();
});

app.get('/views', (req, res) => {
    if(req.session) {
        req.session.views++;
        res.write(`<p>Views: ${req.session.views}</p>`);
        res.write(`<p>Expires in: ${req.session.cookie.maxAge/1000}'s seconds</p>`);
        res.end();
    }
    else {
        req.session.views = 1;
        res.end('Welcome to the session demo, refresh!');
    }
});

app.get('/', (req, res) => {
    res.cookie('myCookie', 'myValue');
    res.send('Hello World');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// let myRouter = express.Router();

// app.get('/', (req, res) => {
//     res.cookie('myCookie', 'myValue');
//     res.cookie('rememberMe', 1);
//     console.log(req.cookies);
//     res.send('Hello World');
// });

//http://localhost:3000/user/editUser

// app.use('/user', myRouter);
// myRouter.get('/editUser', (req, res) => {
//     res.cookie('myCookie', 'myValue');
//     res.cookie('rememberMe', 1);
//     console.log(req.cookies);
//     res.send('Hello World');
// });

// app.get('user/editUser', (req, res) => {
//     res.cookie('myCookie', 'myValue');
//     res.cookie('rememberMe', 1);
//     console.log(req.cookies);
//     res.send('Hello World');
// });
//
// app.get('user/newUser', (req, res) => {
//     res.cookie('myCookie', 'myValue');
//     res.cookie('rememberMe', 1);
//     console.log(req.cookies);
//     res.send('Hello World');
// });

app.listen(3000, () => {
    'Listening on port 3000';
});