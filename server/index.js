const express = require('express');
require('dotenv').config();
const app = express();
const session = require("express-session");
let { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swagController');
const ac = require('./controllers/authController');
const cc = require('./controllers/cartController');
const searchC = require('./controllers/searchController');

app.use(express.json());

app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      
    })
  );
app.use(checkForSession);
//app.use(express.static(`${__dirname}/../build`));

app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.get('/api/user', ac.getUser);
app.post('/api/signout', ac.signout);

app.get('/api/swag', sc.read);


app.post('/api/cart/checkout', cc.checkout);
app.post('/api/cart/:id', cc.add);
app.delete('/api/cart/:id', cc.delete);

app.get('/api/search', searchC.search);

app.listen(SERVER_PORT, () => {
    console.log("I listening dude.")
})