const fs = require('fs');
const file = fs.createWriteStream('./myBigFlie.txt');

for(let i=0; i <= 1e6; i++){
    file.write('');
}