var path = require('path');
var express = require('express');

var app = () => {
  const app = express();
  const indexPath = path.join(__dirname, '/build/index.html');
  const publicPath = express.static(path.join(__dirname, '/build/static'));


  console.log(path.join(__dirname, '/build/static'));

  app.use('/static', publicPath);
  app.get('/', function (_, res) {
    res.sendFile(indexPath);
  });

  return app;
};

var port = (process.env.PORT || 8080)
var appInstance = app();
appInstance.listen(port);
console.log(`Listening at http://localhost:${port}`);
