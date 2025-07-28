const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path')


const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

// server.js
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


const foodsController = require('./controllers/foods.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
const authController = require("./controllers/auth.js");


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.set('view engine', 'ejs');

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(passUserToView);

app.get("/", async (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
    });
});

const usersController = require('./controllers/users.js');

app.use('/auth', authController);
app.use('/users', usersController);
app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

