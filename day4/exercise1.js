const fs = require('fs');
const path = require('path');

let file1 = path.join('./', 'exercise1.js');
let file2 = path.join('./', 'workspace.js');

let listOfDir = fs.readdir('./', (err, files) => {
    if(err) console.log('an error occured');
    else{
        return files;
    }
});

let stats = fs.stat('./', (err, stats) => {
    if(err) throw err;
    else {
        return stats;
    }
});

let readFile = fs.readFile(file1, 'utf8', (err, data) => {
   if (err) throw err;
   else{
       return data;
   }
});

function returnContents() {

}