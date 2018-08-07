#!/usr/local/bin/node

console.log('hello');

console.log(__dirname);
console.log(__filename);

let argArray = process.argv.splice(2);
console.log('"' + argArray[0] + '" here');


for (let i = 0; i < 20; i++) {
    if (i % 2 === 0 && argArray[0] === 'even') {
        console.log(`even: ${i}`);
    }
    else if (i % 2 != 0 && argArray[0] === 'odd') {
        console.log(`odd: ${i}`);
    }
}

if (argArray[0] === 'add') {
    let sum = 0;
    let numbers = argArray.splice(1);
    for (let i = 0; i < numbers.length; i++) {
        sum += Number(numbers[i]);
    }
    console.log(sum);
}

if (argArray[0] === 'multiply') {
    let sum = 1;
    let numbers = argArray.splice(1);
    for (let i = 0; i < numbers.length; i++) {
        sum *= Number(numbers[i]);
    }
    console.log(sum);
}

if (argArray[0] === 'filter') {
    for (let i = 0; i < argArray.length; i++) {
        if (i % 2 === 0) {
            let sum = 0;
            let numbers = argArray.splice(1);
            sum += Number(numbers[i]);
            console.log(`The sum of all of the even numbers is: ${sum}`);
        }
        else if (i % 2 !== 0) {
            let avg = 0;
            let numbers = argArray.splice(1);
            for (let i = 0; i < numbers.length; i++) {
                avg += (Number(numbers[i])) / (numbers.length);
            }
            console.log(`The average of all of the odd numbers is: ${avg}`);
        }
    }
}
