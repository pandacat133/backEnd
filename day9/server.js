const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const now = new Date();
const currentTime = now.toString();

var validUserArr = ['Celie', 'Dave'];


app.use('/recipes', express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req, res) => {
    res.send('Hello Express!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

app.get('/time', (req, res) => {
    res.send(`Current time is: ${currentTime}`);
});

app.get('/file', (req, res) => {
    const options = {
      root: __dirname
    };

   res.sendFile('recipe.txt', options, err => {
       if(err) throw err;
       else{
           console.log('File successfully sent.');
       }
   });
});

app.post('/addRecipe', (req, res) => {
    const recipe = req.body.recipe;
    const recipeTime = req.body.recipeTime;
    const recipePrice = req.body.recipePrice;
    const userId = req.body.userId;

    let responseBody = `${currentTime}::${recipe}::${recipeTime}::${recipePrice}::${userId}\n`;

    validUserArr.forEach(user => {
        if(user === userId) {
            fs.appendFile('public/recipeInfo.txt', responseBody, err => {
                if(err) throw err;
                console.log('File successfully written');
            });
            res.end();
        }
        else {
            res.end();
        }
    });
});