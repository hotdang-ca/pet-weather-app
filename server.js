var path = require('path');
var express = require('express');
var request = require('request');

var app = () => {
  const app = express();
  const indexPath = path.join(__dirname, '/build/index.html');
  const publicPath = express.static(path.join(__dirname, '/build/static'));


  console.log(path.join(__dirname, '/build/static'));

  app.use('/static', publicPath);
  app.get('/', (_, res) => {
    res.sendFile(indexPath);
  });
  app.get('/pets/:id', (_, res) => {
    res.sendFile(indexPath);
  });
  app.get('/pets/', (_, res) => {
    res.sendFile(indexPath);
  });

  // proxy requests because CORS
  app.get('/weather/:apiKey/:latitude,:longitude', (req, res) => {
    const apiServerHost = 'https://api.darksky.net/forecast';
    const url = apiServerHost + req.url.replace('weather/', '');
    req.pipe(request(url)).pipe(res);
    // res.send(url);
  });
  return app;
};

var port = (process.env.PORT || 8080)
var appInstance = app();
appInstance.listen(port);
console.log(`Listening at http://localhost:${port}`);
