define([
  'js/game/Object'
], function(
  BaseObject
) {

  return BaseObject.extend({

    name: 'Generic Drawable',
    initialize: function(opt) {
      console.log('drawable init');
    },
    draw: function() {

      console.info(this.name + ' : draw');
    }

  });

});