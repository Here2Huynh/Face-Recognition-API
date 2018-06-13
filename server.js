//dependencies 
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controllers
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//connecting to the db via knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

//initilize express
const app = express();
//use bodyParser middleware to parse protocol's body
app.use(bodyParser.json());

//initialize cors
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

//signin
app.post('/signin', signIn.handleSignIn(db ,bcrypt));

//register
app.post('/register', register.handleRegister(db, bcrypt));

//profile
app.get('/profile/:id', profile.handleProfileGet(db));

//image
app.put('/image', image.handleImage(db));

//imageurl
app.post('/imageurl', (req, res) => { image.handleApiCal(req, res)});


//password hashing 
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


//initiate port listening
app.listen(3000, () => {
    console.log('app is running on port 3000');
})







/*

/ --> res = this is working 
/signin --> POST = success/fail  //using POST so it is sent via the body in HTTPS
/register --> POST = user
/profile/:userID --> GET  = user
/image -->  PUT --> user 

*/