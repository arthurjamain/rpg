require.config({
  paths: {
    'jquery'      : 'js/lib/jquery',
    'underscore'  : 'js/lib/underscore',
    'backbone'    : 'js/lib/backbone'
  },
  shim: {
    'underscore'  : {
      exports: '_'
    },
    'backbone'    : {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    }
  }
});

define([
  'js/game/Scene',
], function(Scene) {

  window.scene = new Scene({
    container: 'game'
  });

});