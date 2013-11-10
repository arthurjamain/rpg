define([
  'js/game/Object'
], function (
  BaseObject
) {

  return BaseObject.extend({

    id: 'drawable',
    name: 'Generic Drawable',
    initialize: function (opt) {
      console.log('drawable init');
    },
    draw: function () {
    }

  });

});