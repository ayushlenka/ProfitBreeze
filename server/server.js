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

// For production rate limiting(ip trusting)
app.set('trust proxy', 1);

// App Port
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://profitbreeze.netlify.app',  
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

app.use('/api/auth/verifytoken', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});


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
