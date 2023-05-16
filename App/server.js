//  console.log("Hello");
const mongoose = require('mongoose');
 var cors = require('cors');
 require('dotenv').config();
//  console.log(process.env) 
const path=require('path');


const DBconfig=require(path.join(__dirname,"./config/db.config.js"));
 



mongoose.connect(DBconfig.url);
// i dont want to expose my connection in  server.js so moving to db.config.js

var express = require("express");
// var random=require('random');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', () => {
    console.log('Unable to make connection to database');
})

db.once('open', () => {
    console.log('Connection Successful');
})


app.use(cors());









app.listen(process.env.PORT, () => {
    console.log(`your server is running on port ${process.env.PORT}`);
})



require("./Routes/books.routes.js")(app)
require("./Routes/users.routes.js")(app)


