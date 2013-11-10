define([
  'js/game/Tile'
], function (
  Tile
) {

  return Tile.extend({

    id: 'border',

    initialize: function (opt) {
      this.tile = opt.tile;
      this.material = opt.material;
      this.map = opt.map;

      if (opt.width) {
        this.width = opt.width;
      }
    },

    draw: function (ctx) {

      ctx.beginPath();
      ctx.fillStyle = this.getColor();
      ctx.rect(0, 0, this.map.pxWidth, this.width * this.map.heightRatio);
      ctx.rect(0, 0, this.width * this.map.widthRatio, this.map.pxHeight);
      ctx.rect(this.map.pxWidth - this.width * this.map.widthRatio, 0, this.width * this.map.widthRatio, this.map.pxHeight);
      ctx.rect(0, this.map.pxHeight - this.width * this.map.heightRatio, this.map.pxWidth, this.width * this.map.heightRatio);
      ctx.fill();
      ctx.closePath();

    },

    getColor: function () {
      return this.color || '#5F2D09';
    }

  });

});