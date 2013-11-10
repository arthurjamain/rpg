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
      this.sinceLastFrame = Date.now() - (this.lastFrame || 0);
      this.sinceLastFrameRatio = this.sinceLastFrame / 1000;
      this.lastFrame = Date.now();
    }

  });

});