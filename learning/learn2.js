const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('demo'));

const port = 8001;

const server = app.listen(port, listening);

function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

//movie ex
const data = [];
app.post('/addMovie', addMovie);

function addMovie(req, res) {
  data.push(req.body);
  console.log(data);
}

// setTimeout(function(){ console.log('third') }, 3000);

// function sync(){
// console.log('first')
// }

// sync()
// console.log('second')