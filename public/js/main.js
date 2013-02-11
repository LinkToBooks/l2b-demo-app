require.config({

  paths: {
    'jquery':              '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
    'json2':               '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2',
    'underscore':          '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'backbone':            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min',
    'backbone.marionette': '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.0-rc4-bundled/backbone.marionette.min'
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
  
require(['app'], function (app) {
  'use strict';
  console.log('loaded ' + app);
});