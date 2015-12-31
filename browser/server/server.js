var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res, next) {
  console.log(`Received a ${req.method} for ${req.path}`);
  console.log(`full path: ${path.join(__dirname, '../public', req.path)}`);
  next();
});

app.get('/', function (req, res, next) {
  console.log('sending index.html...');
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log(path.join(__dirname, '../public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`The browser server is listening at http://${host}:${port}`);
});
