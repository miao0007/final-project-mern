const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const axios = require('axios');
const users = require('./routes/users');
const profile = require('./routes/profile');
const posts = require('./routes/posts');

const app = express();

require('dotenv').config();



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/stuff';

mongoose.connect(mongoUri, { useNewUrlParser: true });


// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/users', users);
app.use('/profile', profile);
app.use('/posts', posts);

// Define API routes here
app.get('/api/books/:search', (req, res) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.search}`;
  console.log(url);
  axios
    .get(url)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  
});

// Send every other request to the React app
// Define any API routes before this runs

// // Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// // Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT} `);
});
