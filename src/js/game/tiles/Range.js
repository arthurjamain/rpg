define([
  'js/game/Tile'
], function (
  Tile
) {

  return Tile.extend({

    id: 'range',

    initialize: function (opt) {

      Tile.prototype.initialize.call(this, opt);

      if (opt.range) {
        this.range = opt.range;
      }

      if (this.range) {

        var lowestY = 99999, highestY = 0, lowestX = 99999, highestX = 0;
        var scaledRange = [];
        for (var k in this.range) {
          if (this.range.hasOwnProperty(k)) {
            lowestY = Math.min(lowestY, this.range[k].y);
            highestY = Math.max(highestY, this.range[k].y);
            lowestX = Math.min(lowestX, this.range[k].x);
            highestX = Math.max(highestX, this.range[k].x);
          }
        }

        this.position = {
          x: lowestX + (highestX - lowestX) / 2,
          y: lowestY + (highestY - lowestY) / 2
        };
        this.boundingRect = {
          x: lowestX,
          y: lowestY,
          width: highestX - lowestX,
          height: highestY - lowestY
        };

      }

    },

    draw: function (ctx) {

      if (!this.scaledRange) {
        this.scaledRange = [];
        for (var k in this.range) {
          this.scaledRange.push({x: this.range[k].x * ctx.widthRatio, y: this.range[k].y * ctx.heightRatio});
        }
      }
      //console.log(this.color, this.range[2].x)

      ctx.beginPath();
      for (var k in this.range) {
        ctx.lineTo(this.range[k].x * this.map.widthRatio, this.range[k].y * this.map.heightRatio);
      }
      ctx.closePath();
      ctx.fillStyle = this.getColor();
      ctx.fill();

    },

    getClosestEdge: function (point) {
      var minXY = 9999;
      var chosenOne;

      for (var i = 1 ; i <= this.range.length ; i += 1) {
        var it = i === this.range.length ? 0 : i;
        var edge = [
          {x: this.range[i - 1].x * this.map.widthRatio, y: this.range[i - 1].y * this.map.heightRatio},
          {x: this.range[it].x * this.map.widthRatio, y: this.range[it].y * this.map.heightRatio}
        ];

        var meanPoint = {
          x: Math.min(edge[0].x, edge[1].x) + Math.abs(edge[0].x - edge[1].x) / 2,
          y: Math.min(edge[0].y, edge[1].y) + Math.abs(edge[0].y - edge[1].y) / 2
        };

        var diffXY = Math.min(Math.abs(meanPoint.y - point.y), Math.abs(meanPoint.x - point.x));

        if (diffXY < minXY) {
          minXY = diffXY;
          chosenOne = edge;
        }

      }

      return chosenOne;

    },

    getColor: function () {
      return this.color || '#0F0';
    }

  });

});