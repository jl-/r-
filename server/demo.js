'use strict';
var express = require('express');

var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers',
      'Content-Type, Authorization, If-Modified-Since');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.static('../dist'));

app.get(/\//, function(req, res) {
  return res.render('../dist/zh/index.html');
});

app.listen(9875);

process.on('SIGINT', function() {
  process.exit(0);
});
process.on('uncaughtException', function(err) {
});
