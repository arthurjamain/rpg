define([
  'js/game/Drawable'
], function(
  Drawable
) {

  return Drawable.extend({

    initialize: function(opt) {
      this.role = opt.role;
      this.type = opt.type;

      if (opt.width) {
        this.width = opt.width;
      }
      if (opt.range) {
        this.range = opt.range;
      }
    },

    draw: function(ctx) {

      if (this.role === 'border') {
        console.log('yo :)');
        ctx.beginPath();
        ctx.rect(0, 0, 64, 64);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#5F2D09';
        ctx.stroke();
      } else if (this.role === 'range') {

      }

    }

  });

});