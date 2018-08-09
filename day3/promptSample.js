const EventEmitter = require('events');

class MyPlant extends EventEmitter {

}

const myPlant = new MyPlant();

let counter = 0;
let size = 0;
let hasBeenPlanted = false;

myPlant.once('plantSeed', () => {
    size = 1;
    hasBeenPlanted = true;
    console.log('-- SEEDED --');
});

myPlant.on('water', () => {
    if (hasBeenPlanted) {
        size++;
        console.log('Like it');
    } else {
        console.log('Error: Plant the seed first');
    }

});

myPlant.on('bugAttack', () => {
    if (hasBeenPlanted) {
        size--;
        console.log('Go away bug');
    } else {
        console.log('Too bad: the seed hasn\'t been planned');
    }
});

myPlant.on('harvest', () => {
    if (hasBeenPlanted) {
        console.log(`Your plant is ${size} units tall`);
        myPlant.removeAllListeners();
    } else {
        console.log('What!! There is no plant');
    }
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
    //console.log('received data:', util.inspect(text));
    //console.log('received data:' + '\'text\'');
    if (text === 'quit\n') {
        done();
    }
    else if (text === 'plantSeed\n') {
        plantSeed();
    }
    else if (text === 'water\n') {
        water();
    }
    else if (text === 'harvest\n') {
        harvest();
    }
    else if (text === 'bugAttack\n') {
        bugAttack();
    }

});

function water() {
    myPlant.emit('water');
}

function plantSeed() {
    myPlant.emit('plantSeed');
}

function harvest() {
    myPlant.emit('harvest');
}

function bugAttack() {
    myPlant.emit('bugAttack');
}

function done() {
    console.log('User Quits Us, there is nothing more to do.');
    process.exit();
}