"use strict";

var express = require('express');

module.exports = function () {
  
  var app = express();

  app.all('*', function (req, res) {
    res.send('l2b-demo-app at your service');
  });

  return app;
}
