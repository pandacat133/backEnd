const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
// when a get request is coming from the root
const recipeFile = __dirname + '/recipes.txt';
const jsonFile = __dirname + '/recipes.json';

let time = new Date();
let counter = 0;

let jsonArray = {
    recipes: []
};

app.get('/time',(req, res) => {
    res.send(`${time}`);
});

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/text.txt'); // does same as line below
    //res.sendFile('/Users/chevisutton/Desktop/NodeJS/day_9_expressApp/text.txt');
});

//  app.get('/recipes?', (req, res) => {  // should grab file singular or plural using the ?
//      res.sendFile('/recipes?');
// });

app.use('/recipes', express.static('public'));
// app.use(express.static('public')); // this line redirects to home root, type in file name after port

app.use(bodyParser.urlencoded({ extended: true })); // needs to be 1st
app.use(bodyParser.json()); // 2nd comes after bd-parser url

app.post('/addRecipe', (req, res) => {
    let mickey = req.body.firstname;
    let mouse = req.body.lastname;
    let recipe = req.body.recipe; //<input type="text" name="recipe" id="recipe">
    let Id = req.body.id;
    // read json file, convert json string to obj

    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {console.log(err)}
        let prevData = JSON.parse(data);
        // console.log(prevData);
        let dataObj = {
            id: counter++,
            firstname: mickey,
            lastname: mouse,
            recipe: recipe,
            time: time
        };

        prevData.recipes.forEach(recipe => {
            jsonArray.recipes.push(recipe);
        });

        jsonArray.recipes.push(dataObj);
        console.log(jsonArray);
        fs.writeFile(jsonFile, JSON.stringify(jsonArray), 'utf8', (err) => {
            if (err) console.log(err);
        });

    });

    // working code bellow to write VVVVVVVVVVVVV
    // let data = `${mickey} || ${mouse} || ${recipe} || ${time}\n`;
    // // obj.table.push({id: 1, square:2});
    // jsonArray.recipes.push({
    //     Id: counter++,
    //     firstname: mickey,
    //     lastname: mouse,
    //     recipe: recipe,
    //     time: time
    // });

    // var json = JSON.stringify(jsonArray);
    // // res.send(recipe);
    // // res.sendFile(__dirname + '/recipes.txt');
    // // fs.appendFileSync('/Users/chevisutton/Desktop/NodeJS/day_9_expressApp/recipes.txt', dataObj);
    // fs.writeFile(jsonFile, json, 'utf8', (err) => { // writes to json
    //     if(err) throw err;
    //     res.sendfile(recipeFile);
    // });

    // fs.appendFile(recipeFile, data, 'utf8', (err) => { // writes to txt file
    //     if(err) throw err;
    //     res.sendfile(recipeFile);
    // })
    // console.log(data);
    // res.sendFile('/Users/chevisutton/Desktop/NodeJS/day_9_expressApp/recipes.txt');

    res.sendFile(jsonFile);
});

app.listen(3000,() => {
    console.log('Listening on port 3000!');
});