const express = require('express');
const path = require('path');

let app = express();
let date = new Date();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//     res.render('index', {
//             title: 'This is my title.',
//             message: 'This is a message.',
//             partial: ' is fun!'
//         });
// });

// app.get('/', (req, res) => {
//     res.render('index', {
//         users:[
//             {username: 'user1', email: 'email1@email.com'},
//             {username: 'user2', email: 'email2@email.com'},
//             {username: 'user3', email: 'email3@email.com'},
//             {username: 'user3', email: 'email4@email.com'},
//         ],
//         date: date.toLocaleString()
//     });
// });

app.get('/', (req, res) => {
    res.render('index', {list: ['apple', 'orange', 'banana']})
});

app.get('/fruit/:fruit', (req, res) => {
    res.end(`You clicked on ${req.params.fruit}`);
});

app.post('/login', (req, res) => {
    res.end('Hey you! Users should be here!')
});

app.listen(3000, () => {
   console.log('Listening on port 3000');
});