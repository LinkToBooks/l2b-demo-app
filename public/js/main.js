require.config({

  paths: {
    'jquery':              '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
    'json2':               '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2',
    'underscore':          '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'backbone':            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min',
    'backbone.marionette': '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.0-rc4-bundled/backbone.marionette.min',

    // API related.
    'api':                    '//api.127.0.0.1.xip.io:3000',
    'determineFromIPAddress': '//api.127.0.0.1.xip.io:3000/country/determineFromIPAddress?callback=define'
    // can't use the api path to build the determineFromIPAddress url as it does not know what to do with the callback parameter.
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery', 'json2'],
      exports: 'Backbone'
    },
    'backbone.marionette': ['backbone'],
    'underscore': {
      exports: '_'
    }
  }
  
});
  
require(['l2b'], function (app) {
  'use strict';
});