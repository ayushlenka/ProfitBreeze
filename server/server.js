require("dotenv").config({ path: "./config.env" });

const express = require("express");
const routes = require('./routes');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');  
const passport = require('passport');
require('./Authentication/passport');

// Express application
const app = express();

// App Port
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true               
}));

app.use(express.json()); // Middleware
app.use(cookieParser()); // Cookies

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// OAuth2 Passport
app.use(passport.initialize());

app.use('/api', routes);

//MongoDB Connection first, then connects to node server
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to Mongo Atlas DB and Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  })

//Listening for requests
