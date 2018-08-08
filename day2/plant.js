const EventEmitter = require('events');

class Plant extends EventEmitter {

    constructor() {
        super();
        this.size = 0;
        this.hasBeenPlanted = false;
        this.once('plantSeed', this.plantSeedListener);
        this.on('water', this.waterListener);
        this.on('bugAttack', this.bugAttackListener);
        this.on('harvest', this.harvestListener);
        this.on('error', this.errorListener);
    }

    plantSeedListener() {
        this.size = 1;
        this.hasBeenPlanted = true;
        console.log(`Planted seed. The seed is size: ${this.size}`);
    }

    waterListener() {
        if (this.hasBeenPlanted === true) {
            this.size++;
            console.log(`Watered seed. The seed is size: ${this.size}`);
        } else {
            console.log('Oops the seed has not been planted yet.');
        }
    }

    bugAttackListener() {
        if (this.hasBeenPlanted === true) {
            this.size--;
            console.log(`Bug attacked plant. The seed is size: ${this.size}`);
        } else {
            console.log('Oops the seed has not been planted yet.');
        }
    }

    harvestListener() {
        if (!this.hasBeenPlanted) {
            console.log("Oops, you tried to harvest a plant, but you have not planted a seed yet!");
        } else {
            console.log(`Plant has been harvested. The plant size is: ${this.size}`);
            this.removeAllListeners();
        }
    }

    errorListener(err) {
        console.log(`An error has occured: ${err.message}`);
    }
}

let myPlant = new Plant();
myPlant.emit('harvest');
myPlant.emit('bugAttack');
myPlant.emit('plantSeed');
myPlant.emit('water');
myPlant.emit('bugAttack');
myPlant.emit('error', new Error('whoops!'));
myPlant.emit('water');
myPlant.emit('water');
myPlant.emit('water');
myPlant.emit('plantSeed');
myPlant.emit('harvest');
myPlant.emit('water');
myPlant.emit('bugAttack');
myPlant.emit('bugAttack');