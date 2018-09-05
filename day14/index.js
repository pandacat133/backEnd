const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy; // a 'strategy' to use for passport
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const app = express();

// this is our most "Hacker Proof" users database ;p
// We need to swap this out with a real DB later, but for now this will do!
const users = [
    {id: 0, username: 'jason', password: 'abc', email: 'jason@example.com'},
    {id: 1, username: 'kate', password: '123', email: 'kate@example.com'}
];

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',   //'/auth/google/success'
        failureRedirect: '/login'  // or you could redirect it to '/auth/google/failure'
    }));

// define which strategy passport uses
passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:${port}/auth/google/callback`, // update this according to your domain
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        findOrCreate({ googleId: profile.id }, (err, user) =>{
            return done(err, user);
        });
    }
));
//Save the user id in session
//could save the user object, choose to only save the user id
passport.serializeUser((user, done)=>{
    console.log(`saving user to session: ${JSON.stringify(user)}`);
    done(null, user.id);
});
//Remove the user id out from the session
passport.deserializeUser((id, done) =>{
    //should check if this is a valid user id
    //then using done to remove the user from session
    console.log(`retrive user -${JSON.stringify(id)}- JSON.stringify(${users[id]})`);
    const user = users[id];
    done(null, user);
});

// configure app
app.use('/', express.static('public')); // set to display index.html could also use sendFile
app.use(cookieParser());
app.use(express.urlencoded({extended: false})); // use for forms
app.use(express.json()); // use for JSON
app.use(session({
    secret: 'cohort6t',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', (req, res, next) =>{
    passport.authenticate('local',  (err, user, info) =>{
        console.log(err, user, info);
        if (user) {
            //console.log('Here Passport');
            // if Authenticated
            //for debug purpose print out user info
            //res.send({user: user});
            //res.redirect('/welcome.html');
            //
            //this login is make it available by passport
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            req.login(user, (err)=>{
                console.log(`After LOGIN: req.session.passport: ${JSON.stringify(req.session.passport)}`);
                console.log(`req.user: ${JSON.stringify(req.user)} \n ${req.isAuthenticated()}`);
                res.sendFile(path.join(__dirname, 'protected', 'welcome.html'));
            });

        } else {
            //for debug purpose print out the login info
            //res.send({error: err, info: info});
            //res.redirect('/tryagain.html');
            res.redirect('/tryagain');
        }
    })(req, res, next);
});
const tryagainPath = __dirname + '/public/tryagain.html';
app.get('/tryagain', (req, res) =>{
    res.sendFile(tryagainPath);
});
const isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        console.log('isAuthenticated');
        return next();
    }
    console.log('NOT Authenticated');
    res.redirect('/login');
};

app.get('/login', (req, res)=>{
    console.log(`get login :${req.isAuthenticated()}`);
    res.redirect('/');
});

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
app.listen(port, () => {
    console.log(`Passport Local Strategy example app listening on port ${port}!`)
});