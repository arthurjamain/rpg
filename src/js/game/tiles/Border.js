define([
  'js/game/Tile'
], function (
  Tile
) {

  return Tile.extend({

    id: 'borders',

    initialize: function (opt) {
      this.tile = opt.tile;
      this.material = opt.material;
      this.map = opt.map;

      if (opt.width) {
        this.width = opt.width * 2;
      }
    },

    draw: function (ctx) {

      if (!this.pxWidth) {
        this.pxWidth = this.width * ctx.widthRatio;
        this.pxHeight = this.width * ctx.heightRatio;
      }

      ctx.beginPath();
      ctx.fillStyle = this.getColor();
      ctx.rect(0, 0, this.map.pxWidth, this.pxHeight);
      ctx.rect(0, 0, this.pxWidth, this.map.pxHeight);
      ctx.rect(this.map.pxWidth - this.pxWidth, 0, this.pxWidth, this.map.pxHeight);
      ctx.rect(0, this.map.pxHeight - this.pxHeight, this.map.pxWidth, this.pxHeight);
      ctx.fill();
      ctx.closePath();

    },

    getColor: function () {
      return this.color || '#5F2D09';
    }

  });

});