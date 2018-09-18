const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    name: String,
    role: String,
    age: { type: Number, min: 18, max: 70 },
    createdData: { type: Date, default: Date.now}
});
const user = mongoose.model('userCollection', userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listen on port: ${port}`);
});

app.post('/newUser', (req, res) => {
    console.log(`POST /newUser: ${JSON.stringify(req.body)}`);
    const newUser = new user();
    newUser.name = req.body.name;
    newUser.role = req.body.role;
    newUser.save((err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log(`new user save: ${data}`);
        res.send(`done ${data}`);
    });
});

app.post('/updateUserRole', (req, res) => {
    console.log(`POST /updateUserRole: ${JSON.stringify(req.body)}`);
    let matchedName = req.body.name;
    let newRole = req.body.role;
    user.findOneAndUpdate( { name: matchedName }, { role: newRole }, { new: true }, (err, data) => {
        if (err) return console.log(`Oops! ${err}`);
        console.log(`data -- ${data.role}`);
        let returnMsg = `user name : ${matchedName} new role: ${data.role}`;
        console.log(returnMsg);
        res.send(returnMsg);
    });
});

app.post('/removeUser', (req, res) => {
    console.log(`POST /removeUser: ${JSON.stringify(req.body)}`);
    let matchedName = req.body.name;
    user.findOneAndDelete( { name: matchedName }, (err, data) => {
        if (err) return console.log(`Oops! ${err}`);
        console.log(`data -- ${data.role}`);
        let returnMsg = `user name : ${matchedName} removed data: ${data}`;
        console.log(returnMsg);
        res.send(returnMsg);
    });
});

app.get('/user/:name', (req, res) => {
    let userName = req.params.name;
    console.log(`GET /user/:name: ${JSON.stringify(req.params)}`);
    user.findOne({ name: userName }, (err, data) => {
        if (err) return console.log(`Oops! ${err}`);
        console.log(`data -- ${JSON.stringify(data)}`);
        let returnMsg = `user name : ${userName} role : ${data.role}`;
        console.log(returnMsg);
        res.send(returnMsg);
    });
});

mongoose.connect('mongodb://localhost/userManagementDB', {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connected');
});