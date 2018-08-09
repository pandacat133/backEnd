const fs = require('fs');

// fs.readdir('./', (err, files) => {
//     if(err) console.log('an error occured');
//     else{
//         console.log(files);
//     }
// });

// let files = fs.readdirSync('./');
// console.log(files);

// fs.readFile('./tmp/readme.md', {encoding:'utf8'},(err, data) => {
//    if(err) throw err;
//    console.log(data);
// });

// let data = fs.readFileSync('./tmp/readme.md', 'utf8');
// console.log(data);

// fs.writeFile('./tmp/readme.md', 'Woof', (err) => {
//     if(err) throw err;
//     console.log('File has been written.');
// });
//
// console.log('Writing to file...');

// fs.stat('./tmp/readme.md', (err, stats) => {
//     if(err) throw err;
//     console.log(stats);
// });