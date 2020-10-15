const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose.connect(db, 
    { useNewUrlParser: true}
    ).then(() => console.log("MongoDb successfully connected"))
    .catch(err => console.log(err));

    // setup Heroku port for deploying
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT} !`));