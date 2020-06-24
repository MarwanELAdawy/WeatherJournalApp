// Setup empty JS object to act as endpoint for all routes
var projectData = {};
const posts = [];
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`The server is running at port: ${port}`);
});
//routes
app.get('/projectData',(req, res)=>{
    res.send(projectData);
    console.log(projectData);
});
app.post('/projectData',(req, res)=>{
    console.log(req.body);
    projectData = req.body;
    posts.push(projectData);
    console.log(posts);
});