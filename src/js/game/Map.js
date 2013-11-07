define([
  'js/game/Drawable',
  'js/game/Tile'
], function(
  Drawable,
  Tile
) {

  return Drawable.extend({
    name: 'map',
    initialize: function(opt) {
      console.log('map init');
      Drawable.prototype.initialize.call(this, opt);

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
          this.tiles.push(new Tile(tiles[k]));
        }

        this.trigger('ready', this);
    },

    draw: function(ctx) {
      for (var k in this.tiles) {
        this.tiles[k].draw(ctx);
      }
    }

  });

});