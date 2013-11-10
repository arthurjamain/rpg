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
      this.hitboxSize = opt.hitboxSize;
      if (opt.spawn) {
        this.position.x = opt.spawn.x;
        this.position.y = opt.spawn.y;
      }

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
    },

    draw: function (ctx) {

      Mob.prototype.draw.call(this, ctx);


      if (this.movingLeft && !this.collidingLeft) {
        this.position.x -= 10 * this.sinceLastFrameRatio * ctx.widthRatio;
      }
      if (this.movingRight && !this.collidingRight) {
        this.position.x += 10 * this.sinceLastFrameRatio * ctx.widthRatio;
      }
      if (this.movingUp && !this.collidingUp) {
        this.position.y -= 10 * this.sinceLastFrameRatio * ctx.heightRatio;
      }
      if (this.movingDown && !this.collidingDown) {
        this.position.y += 10 * this.sinceLastFrameRatio * ctx.heightRatio;
      }

    }

  });

});