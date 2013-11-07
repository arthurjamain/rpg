define([
  'js/game/Drawable',
  'js/game/Tile'
], function(
  Drawable,
  Tile
) {

  return Drawable.extend({
    name: 'map',
    widthRatio: 0, // pixel value / map width value (arbitrary)
    heightRatio: 0,
    pxWidth: 0,
    pxHeight: 0,
    width: 0,
    height: 0,

    initialize: function(opt) {

      Drawable.prototype.initialize.call(this, opt);
      this.game = opt.game;

      this.pxWidth = opt.width;
      this.pxHeight = opt.height;

      if (opt.fileUri) {
        this.loadMap(opt.fileUri, function(error, mapFile) {
          if (error) { return alert('Error while loading map file : ' + error.toString()); }
          this.instanciateFile(mapFile);
        }.bind(this));
      } else if (opt.mapFile) {
        this.instanciateFile(mapFile);
      }

    },

    loadMap: function(uri, cb) {
      $.get(uri, function(data) {
        cb(null, data);
      }).error(function(err) {cb(err, null)});

    },

    instanciateFile: function(mapFile) {

        this.width = mapFile.width;
        this.height = mapFile.height;
        this.tiles = [];

        var tiles = mapFile.tiles;
        for (var k in tiles) {
          tiles[k].map = this;
          this.tiles[tiles[k].index] = new Tile(tiles[k]);
        }

        this.widthRatio = this.pxWidth / this.width;
        this.heightRatio = this.pxHeight / this.height;

        this.trigger('ready', this);
    },

    draw: function(ctx) {
      for (var k in this.tiles) {
        this.tiles[k].draw(ctx);
      }
    }

  });

});