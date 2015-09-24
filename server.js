var path = require('path');

global.BASE_PATH = path.normalize(__dirname);

var PORT = 3000;

var secretsDB = require('nosql').load(BASE_PATH + '/db/secrets.db');

var Secrets = require('./Secrets');
var SECRETS = new Secrets(secretsDB);

var errors = require('./errors');
var validate = require('./validate');
var mustache = require('mustache');
var fs = require('fs');

var express = require('express.io');
var app = express().http().io();

var prettyDate = require('./prettyDate');

app.use(require('body-parser').json());

app.io.route('post', function (req) {
  if (!req.data) {
    req.io.respond(errors.NO_DATA);
    return;
  }
  var validation = validate(req.data);
  if (validation.failures) {
    req.io.response(errors.VALIDATION_ERROR, validation.failures);
  } else {
    var secret = {
      date: new Date().toISOString(),
      message: validation.success
    };
    SECRETS.add(secret, function (data) {
      app.io.broadcast('new', data);
    });
  }
});

app.io.route('latest', function (req) {
  req.io.respond({secret: SECRETS.get()[0]});
});

app.use("/static", express.static(BASE_PATH + "/static"));

app.get('/', function (req, res) {
  var secrets = SECRETS.get();

  var page = fs.readFileSync('templates/index.html', 'utf-8');
  var html = mustache.render(page, {secrets: secrets});
  res.send(html);
});

app.post('/', function (req, res) {
  req.io.route('post');
});

app.get('/latest', function (req, res) {
  req.io.route('latest');
});

secretsDB.on('load', function () {
  app.listen(PORT);
  console.log('Listening on ' + PORT);
});

secretsDB.on('error', function (err) {
  console.error(err);
});