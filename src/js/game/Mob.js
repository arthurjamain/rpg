/* globals define */
define([
  'jquery',
  'underscore',
  'js/game/Drawable'
], function (
  $,
  _,
  Drawable
) {

  return Drawable.extend({

    position: { x: 0, y: 0 },

    initialize: function (opt) {

      Drawable.prototype.initialize.call(this, opt);


      _.extend(this.position, opt.spawn || { x: 0, y: 0});
      this.hitbox = opt.hitbox || { width: 1, height: 1 };
      this.speed = opt.speed || 10;
      this.orientation = { name: 'up', angle: 0 }

    },

    getOrientation: function (mvts) {
      var keys = _.keys(mvts);
      if (keys.length > 1) {
        var a1 = mvts[keys[0]];
        var a2 = mvts[keys[1]];

        var bigger = Math.max(a1, a2);
        var smaller = a1 === bigger ? a2 : a1;
        var name;

        if (keys[0] === 'up' || keys[0] === 'down') {
          name = keys[0] + keys[1]
        } else {
          name = keys[1] + keys[0]
        }

        return {name: name, angle: (bigger - (bigger - smaller) / 2)};

      } else if (keys.length === 1) {
        return {name: keys[0], angle: mvts[keys[0]]};
      } else {
        return this.orientation;
      }

    },

    draw: function (ctx) {

      Drawable.prototype.draw.call(this, ctx);

      var hbw = this.hitbox.width * ctx.widthRatio;
      var hbh = this.hitbox.height * ctx.heightRatio;
      var movements = {};

      if (this.movingLeft && !this.collidingLeft) {
        this.position.x -= 10 * ctx.sinceLastFrameRatio * ctx.widthRatio;
        movements.left = 3 * Math.PI / 2;
      }
      if (this.movingRight && !this.collidingRight) {
        this.position.x += 10 * ctx.sinceLastFrameRatio * ctx.widthRatio;
        movements.right = Math.PI / 2;
      }
      if (this.movingUp && !this.collidingUp) {
        this.position.y -= 10 * ctx.sinceLastFrameRatio * ctx.heightRatio;
        movements.up = 0;
      }
      if (this.movingDown && !this.collidingDown) {
        this.position.y += 10 * ctx.sinceLastFrameRatio * ctx.heightRatio;
        movements.down = Math.PI;
      }

      this.orientation = this.getOrientation(movements);

      ctx.beginPath();
      ctx.save();
      //ctx.rotate((this.orientation.angle * 57.2) * 180 / Math.PI);
      ctx.rect(
        this.position.x - hbw / 2,
        this.position.y - hbh / 2,
        hbw,
        hbh
      );
      ctx.fillStyle = '#953A8C';
      ctx.fill();
      ctx.restore();

    }

  });
});