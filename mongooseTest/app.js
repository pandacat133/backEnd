const mongoose = require('mongoose');
const express = require('expresss');

const app = express();

mongoose.connect('mongodb://localhost/crudexample');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('db connected');
});

const todoSchema = new mongoose.Schema({
    item: String,
    detail: String,
    level: {
        type: Number,
        min: 1,
        max: 5
    },
    doneBy: {
        type: Date,
        default: Date.now
    }
});

const todo = mongoose.model('todo', todoSchema);

const myTodo = new todo();
myTodo.item = 'do more';
myTodo.detail = 'do a lot of things';
myTodo.save((err, data) => {
   if(err) {
       return console.error(err);
   }
   console.log(`new todo save: ${data}`);
});