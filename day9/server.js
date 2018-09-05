//IMPORTS:

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const path = require('path');

//CONST VARIABLES:

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const fs = require('fs');
const app = express();
const now = new Date();
const currentTime = now.toString();
const jsonFile = __dirname + '/recipes.json';


//LET VARIABLES:

let validUserArr = ['Celie', 'Dave'];
let users = [
    {id: 0, username: 'jason', password: 'abc', email: 'jason@example.com'},
    {id: 1, username: 'kate', password: '123', email: 'kate@example.com'}
];

let jsonArray = {
    recipes: []
};

//FUNCTIONS:

    // function findByUsername(username, callback) {
    //     for (let i = 0, len = users.length; i < len; i++) {
    //         const user = users[i];
    //         if (user.username === username) {
    //             return callback(null, user);
    //         }
    //     }
    //     return callback(null, null);
    // }

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('isAuthenticated');
        return next();
    }
    console.log('NOT Authenticated');
    res.redirect('/login');
};

const tryagainPath = __dirname + '/auth/tryagain.html';
app.get('/tryagain', (req, res) => {
    res.sendFile(tryagainPath);
});

function findOrCreate(username, callback) {
    for (let i = 0, len = users.length; i < len; i++) {
        const user = users[i];
        if (user.username === username) {
            return callback(null, user);
        }else{
            console.log(`new user: ${username}`);
            let newuser = {};
            newuser.id = 3;
            newuser.username = username;

            users.push(newuser);
            return callback(null, newuser);
        }
    }
}

//PASSPORT:

passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:3000/auth/google/callback`,
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        findOrCreate({ googleId: profile.id }, (err, user) =>{
            return done(err, user);
        });
    }
));

passport.serializeUser((user, done)=>{
    console.log(`saving user to session: ${JSON.stringify(user)}`);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`retrive user -${JSON.stringify(id)}- JSON.stringify(${users[id]})`);
    const user = users[id];
    done(null, user);
});

//APP CONFIGURATION:

app.use('/recipes', express.static('public'));

app.use('/', express.static('auth'));

app.use(passport.initialize());

app.use(passport.session());

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
}, (req, res, next) => {
    console.log('Request Methods:', req.method);
    next();
});

app.use(session({
    secret: 'rawr',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000000}
}));

//GET REQUESTS:

app.get('/',(req, res) => {
    res.send('Hello Express!');
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

app.get('/sessionRecipes', (req, res) => {
    if(req.session) {
        res.write(`<p>Recipes Created: ${req.session.views}</p>`);
        res.end();
    }
    else {
        console.log('No recipes have been created yet');
        req.session.views = 0;
        res.end();
    }
});

app.get('/login', (req, res) => {
    console.log(`get login :${req.isAuthenticated()}`);
    res.redirect('/');
});

app.get('/protected', isAuthenticated, function (req, res) {
    res.send('You are authorized.  This is protected.');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

app.get('/protected/:pages', isAuthenticated, function(req, res){
    //res.send(`You are authorized.  This is protected. ${req.params.pages}`);
    res.sendFile(path.join(__dirname, 'protected', req.params.pages));
});

app.get('/showcars', isAuthenticated, function(req, res){
    let carJsonFilePath = path.join(__dirname, 'protected', 'cars.json');
    let data = fs.readFileSync(carJsonFilePath, 'utf8');
    console.log(`return json file`);
    res.json(JSON.parse(data));
});

//POST REQUESTS:

app.post('/addRecipe', (req, res) => {
    if(req.session.views) {
        req.session.views++;
    }
    else {
        console.log(`initializing views: ${req.session.views}`);
        req.session.views = 1;
    }

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
        }
    });

    fs.readFile('recipes.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let prevData = JSON.parse(data);
        let dataObj = {
            userId: userId,
            recipe: recipe,
            recipePrice: recipePrice,
            recipeTime: recipeTime
        };

        prevData.recipes.forEach(recipe => {
            jsonArray.recipes.push(recipe);
        });

        jsonArray.recipes.push(dataObj);
        fs.writeFile(jsonFile, JSON.stringify(jsonArray), 'utf8', (err) => {
            if (err) console.log(err);
            res.sendFile(jsonFile);
        });
    });
});

    // app.post('/login', (req, res, next) => {
    //     passport.authenticate('local', (err, user, info) => {
    //         console.log(err, user, info);
    //         if (user) {
    //             console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    //             console.log(`req.user: ${JSON.stringify(req.user)}`);
    //             req.login(user, (err) => {
    //                 if(err) throw err;
    //                 console.log(`After LOGIN: req.session.passport: ${JSON.stringify(req.session.passport)}`);
    //                 console.log(`req.user: ${JSON.stringify(req.user)} \n ${req.isAuthenticated()}`);
    //                 res.sendFile(path.join(__dirname + '/protected/welcome.html'));
    //             });
    //         } else {
    //             res.redirect('/tryagain');
    //         }
    //     })(req, res, next);
    // });

//LISTEN REQUESTS:

app.listen(3000, () => {
    console.log('Listening on port 3000');
});