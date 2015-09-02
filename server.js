var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config');
var webshots = require('./controllers/webshots');

var app = express();

// uncomment line below to run locally or without Amazon IAM roles
// AWS.config.loadFromPath('.aws/config.json');

function errorHandler(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Server error');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', config.allowed);
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

app.listen(config.port, function() {
  console.log('App is running on http://localhost:' + config.port);
});

app.post(config.post_url, webshots);

app.use(errorHandler);
