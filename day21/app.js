const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userManagementDB', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connected');
});

const userSchema = new mongoose.Schema({
    name: String,
    role: String,
    age: { type: Number, min: 18, max: 70 },
    createdData: { type: Date, default: Date.now}
});

const user = mongoose.model('userCollection', userSchema);