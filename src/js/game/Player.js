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
      console.log(opt);
      Mob.prototype.initialize.call(this, opt);
      this.spriteRange = 11;
      this.spriteLines = 2;
      this.spriteCurrentLine = 1;
      this.spriteLineSeparation = 4;
      this.spriteCycle = 0;
      this.spriteWidth = 24;
      this.spriteHeight = 32;
      this.spriteCoords = { };

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
    drawModel: function (ctx) {

      if (this.sprite.width) {

        if (this.isMoving()) {
          var line;
          if (this.movingUp) {
            line = 0;
          }
          if (this.movingRight) {
            line = 1;
          }
          if (this.movingDown) {
            line = 2;
          }
          if (this.movingLeft) {
            line = 3;
          }
          this.spriteCoords = { x: this.spriteCycle * this.spriteWidth, y: (line + this.spriteCurrentLine * this.spriteLineSeparation) * this.spriteHeight }

          if (this.spriteCycle < this.spriteRange) {
            this.spriteCycle += 1;
          } else {
            this.spriteCycle = 0;
            if (this.spriteCurrentLine < this.spriteLines) {
              this.spriteCurrentLine += 1;
            } else {
              this.spriteCurrentLine = 1;
            }
          }
        } else {
          this.spriteCycle = 0;
          this.spriteCoords = { x: this.spriteCycle * this.spriteWidth, y: (line + this.spriteCurrentLine * this.spriteLineSeparation) * this.spriteHeight }
        }

        ctx.drawImage(
          this.sprite,
          this.spriteCoords.x,
          this.spriteCoords.y,
          this.spriteWidth,
          this.spriteHeight,
          this.position.x - this.hbw / 2,
          this.position.y - this.hbh / 2,
          this.hbw,
          this.hbh
        );

      }

    },

  });

});