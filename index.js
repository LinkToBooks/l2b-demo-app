"use strict";

var express = require('express');

module.exports = function () {
  
  var app = express();

  var publicDir = __dirname + '/public';

  app.use( '/', express.static( publicDir ) );

  return app;
}
