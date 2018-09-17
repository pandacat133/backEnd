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

mongoose.connect('mongodb://localhost/userManagementDB', {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connected');
});