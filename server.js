//Jeremiah Bill
//Server side for SmartMirror
//uses package.jsom to manage dependencies
//run node server.js to intilize local server
//http://localhost:8000/SmartMirror.html

var express = require('express');
var app = express();

// required to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// put all of  static files (e.g., HTML, CSS, JS, JPG) in the static_files/
// sub-directory, and the server will serve them from there.
app.use(express.static('static_files'));

// start the server on http://localhost:8000/
var server = app.listen(8000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});
