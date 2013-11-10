define([
  'jquery',
  'js/game/Mob'
], function (
  $,
  Mob
) {

  return Mob.extend({

    id: 'player',
    initialize: function (opt) {

      this.game = opt.game;
      Mob.prototype.initialize.call(this, opt);

    },

    moveLeft: function (moving) {
      this.movingLeft = moving;
    },
    moveRight: function (moving) {
      this.movingRight = moving;
    },
    moveUp: function (moving) {
      this.movingUp = moving;
    },
    moveDown: function (moving) {
      this.movingDown = moving;
    }

  });

});