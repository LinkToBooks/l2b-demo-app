"use strict";

var express = require('express');

module.exports = function () {
  
  var app = express();

  var publicDir = __dirname + '/public';

  app.use( '/', express.static( publicDir ) );

  app.all( '*', function (req,res) {
    res.status(404);
    res.sendfile( publicDir + '/404.html' );
  });

  return app;
};
