define([
  'jquery',
  'underscore',
  'js/lib/async',
  'js/game/Drawable',
  'js/game/tiles/Border',
  'js/game/tiles/Range'
], function (
  $,
  _,
  async,
  Drawable,
  Border,
  Range
) {

  var Tiles = {
    'border': Border,
    'range': Range
  };

  return Drawable.extend({
    id: 'map',

    widthRatio    : 0, // pixel value / map width value (arbitrary)
    heightRatio   : 0,
    pxWidth       : 0,
    pxHeight      : 0,
    width         : 0,
    height        : 0,
    collisions    : true,
    materials     : { },
    tiles         : [ ],
    collidables   : [ ],

    initialize: function (opt) {

      Drawable.prototype.initialize.call(this, opt);
      this.game = opt.game;

      this.pxWidth = opt.width;
      this.pxHeight = opt.height;
      this.quadrants = opt.quadrants;

      if (opt.fileUri) {
        this.loadMap(opt.fileUri, function (error, mapFile) {
          if (error) { return window.alert('Error while loading map file : ' + error.toString()); }
          this.instanciateFile(mapFile, function () {
            this.setPreferences(mapFile);
            this.trigger('ready', this);
          }.bind(this));
        }.bind(this));
      } else if (opt.mapFile) {
        this.instanciateFile(opt.mapFile, function () {
          this.trigger('ready', this);
        });
      }

    },

    loadMap: function (uri, cb) {
      $.get(uri, function (data) {
        cb(null, data);
      }).error(function (err) {cb(err, null); });
    },

    setPreferences: function (mapFile) {
      this.mapPreferences = mapFile;
    },
    instanciateFile: function (mapFile, cb) {
      this.width = mapFile.width;
      this.height = mapFile.height;
      this.widthRatio = this.pxWidth / this.width;
      this.heightRatio = this.pxHeight / this.height;
      this.quadrantWidth = this.pxWidth / this.quadrants.x;
      this.quadrantHeight = this.pxHeight / this.quadrants.y;

      var tiles = mapFile.tiles;
      async.eachLimit(
        tiles,
        4,

        function (t, done) {
          t.map = this;
          this.forgeTile(t, function (tile) {
            this.tiles[t.index] = tile;
            if (tile.id === 'borders') {
              this.borders = tile;
            } else if (tile.collisions) {
              this.collidables.push(tile);
              this.assignQuadrants(tile);
            }
            done();
          }.bind(this));
        }.bind(this),

        function () {
          //delete mapFile.tiles;
          if (typeof cb === 'function') { cb(); }
        }.bind(this)

      );

    },

    assignQuadrants: function (tile) {
      var xSpan = Math.ceil((tile.boundingRect.width * this.widthRatio) / this.quadrantWidth);
      var ySpan = Math.ceil((tile.boundingRect.height * this.heightRatio) / this.quadrantHeight);

      var minXQuadrant = Math.floor((tile.boundingRect.x * this.widthRatio) / this.quadrantWidth);
      var minYQuadrant = Math.floor((tile.boundingRect.y * this.heightRatio) / this.quadrantHeight);

      tile.quadrants = { x: minXQuadrant, y: minYQuadrant, width: xSpan, height: ySpan };

    },

    draw: function (ctx) {
      for (var k in this.tiles) {
        this.tiles[k].draw(ctx);
      }
    },

    forgeTile: function (tileConfig, cb) {
      var Tile = Tiles[tileConfig.tile];
      var material = this.materials[tileConfig.material];
      var forge = function (material) {
        var tile = new Tile(tileConfig);
        _.extend(tile, material);
        cb(tile);
      };

      if (material) {
        forge(material);
      } else {
        $.getJSON(
          'materials/' + tileConfig.material + '.json',
          function (data) {
            this.materials[tileConfig.material] = data;
            forge(this.materials[tileConfig.material]);
          }.bind(this)
        );
      }
    }

  });

});