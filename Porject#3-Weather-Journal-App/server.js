// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const port = 8005;

// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());

//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require('body-parser');

//parse the json files coming from the clint side
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Callback function to complete GET '/all'
const getAll = (req, res) => res.status(200).send(projectData);

// GET Route
app.get('/all', getAll);

// Callback function to complete POST '/add'
const postData = async (req, res) => {
  projectData = await req.body;
  console.log(projectData);
  res.status(200).send(projectData);
};
// POST Route
app.post('/add', postData);

// Setup Server
app.listen(port, function () {
  console.log('listening on port' + port);
});
