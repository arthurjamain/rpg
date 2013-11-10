define([
  'js/game/Tile'
], function (
  Tile
) {

  return Tile.extend({

    id: 'range',

    initialize: function (opt) {
      this.tile = opt.tile;
      this.material = opt.material;
      this.map = opt.map;

      if (opt.range) {
        this.range = opt.range;
      }
    },

    draw: function (ctx) {

      //console.log(this.color, this.range[2].x)

      ctx.beginPath();
      for (var k in this.range) {
        ctx.lineTo(this.range[k].x * this.map.widthRatio, this.range[k].y * this.map.heightRatio);
      }
      ctx.closePath();
      ctx.fillStyle = this.getColor();
      ctx.fill();

    },

    getColor: function () {
      return this.color || '#0F0';
    }

  });

});