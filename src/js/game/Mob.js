/* globals define */
define([
  'jquery',
  'js/game/Drawable'
], function (
  $,
  Drawable
) {

  return Drawable.extend({

    position: { x: 0, y: 0 },

    initialize: function (opt) {

      Drawable.prototype.initialize.call(this, opt);

    },

    draw: function (ctx) {

      Drawable.prototype.draw.call(this, ctx);

      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.hitboxSize * ctx.widthRatio, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.fill();

    },

    setMapConfiguration: function (opt) {

      if (!opt) { return; }

      if (opt.spawn) {
        console.log("yo");
        this.position.x = opt.spawn.x;
        this.position.y = opt.spawn.y;
      }
    }

  });
});