const EventEmitter = require('events');

class Person extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.on('speak', this.speakListener);
        this.once('born', this.bornListener);
    }
    speakListener(said) {
        console.log(`${this.name}: ${said}`);
    }
    bornListener() {
        console.log(`${this.name} has been born`);
    }
}

let ben = new Person('Benjamin Franklin');
let curtis = new Person('Curtis Dalton');
ben.emit('born');
curtis.emit('speak', 'hi');
curtis.emit('speak', 'world');
ben.emit('speak','You may delay, but time will not.');