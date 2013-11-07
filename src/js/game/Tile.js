define([
  'js/game/Drawable'
], function(
  Drawable
) {

  return Drawable.extend({

    initialize: function(opt) {
      this.role = opt.role;
      this.type = opt.type;
      this.map = opt.map;

      if (opt.width) {
        this.width = opt.width;
      }
      if (opt.range) {
        this.range = opt.range;
      }
    },

    draw: function(ctx) {
      if (this.role === 'border') {
        ctx.beginPath();
        ctx.fillStyle = '#5F2D09';
        ctx.rect(0, 0, this.map.pxWidth, this.width * this.map.heightRatio);
        ctx.rect(0, 0, this.width * this.map.widthRatio, this.map.pxHeight);
        ctx.rect(this.map.pxWidth - this.width * this.map.widthRatio, 0, this.width * this.map.widthRatio, this.map.pxHeight);
        ctx.rect(0, this.map.pxHeight - this.width * this.map.heightRatio, this.map.pxWidth, this.width * this.map.heightRatio);
        ctx.fill();
        ctx.closePath();
      } else if (this.role === 'range') {

        ctx.beginPath();
        for (var k in this.range) {
          ctx.lineTo(this.range[k].x * this.map.widthRatio, this.range[k].y * this.map.heightRatio);
        }
        ctx.closePath();

        ctx.fillStyle = '#B6FF68';
        ctx.fill();

      }

    }

  });

});