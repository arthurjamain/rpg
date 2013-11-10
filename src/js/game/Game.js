define([
  'jquery',
  'underscore',
  'js/game/Object',
  'js/game/Scene',
  'js/game/Map',
  'js/game/Player'
], function (
  $,
  _,
  BaseObject,
  Scene,
  Map,
  Player
) {

  return BaseObject.extend({

    width: 1440,
    height: 900,

    initialize: function (opt) {

      this.width = opt.width || this.width;
      this.height = opt.height || this.height;

      this.scene = this.initScene({
        container: opt.container,
        width: this.width,
        height: this.height
      });

      this.map = this.createMap({
        fileUri: 'maps/1.json',
        game: this,
        width: this.width,
        height: this.height
      });

      this.bindKeys();

      this.map.on('ready', function () {

        console.log(this.map.mapPreferences.player);
        this.player = this.createPlayer(this.map.mapPreferences.player);

        this.scene.add(this.map);
        this.scene.add(this.player);

        this.scene.draw();
      }.bind(this));

    },
    initScene: function (opt) {
      return new Scene(opt);
    },
    createMap: function (opt) {
      return new Map(opt);
    },
    createPlayer: function (opt) {
      opt = opt || { };
      _.extend(opt, {
        game: this
      });
      return new Player(opt);
    },

    bindKeys: function () {
      $(document).on('keydown', this.onKeyDown.bind(this));
      $(document).on('keyup', this.onKeyUp.bind(this));
    },
    unbindKeys: function () {
      $(document).off('keydown', this.onKeyDown.bind(this));
      $(document).off('keyup', this.onKeyUp.bind(this));
    },



    onKeyDown: function (e) {
      if (e.which === 90) {
        this.keyDownUp(e);
      }
      if (e.which === 81) {
        this.keyDownLeft(e);
      }
      if (e.which === 83) {
        this.keyDownDown(e);
      }
      if (e.which === 68) {
        this.keyDownRight(e);
      }
    },
    onKeyUp: function (e) {
      if (e.which === 90) {
        this.keyUpUp(e);
      }
      if (e.which === 81) {
        this.keyUpLeft(e);
      }
      if (e.which === 83) {
        this.keyUpDown(e);
      }
      if (e.which === 68) {
        this.keyUpRight(e);
      }
    },

    // Alignment feels so good.
    keyDownUp     : function () { if (this.player) { this.player.moveUp(true);      } },
    keyDownLeft   : function () { if (this.player) { this.player.moveLeft(true);    } },
    keyDownDown   : function () { if (this.player) { this.player.moveDown(true);    } },
    keyDownRight  : function () { if (this.player) { this.player.moveRight(true);   } },
    keyUpUp       : function () { if (this.player) { this.player.moveUp(false);     } },
    keyUpLeft     : function () { if (this.player) { this.player.moveLeft(false);   } },
    keyUpDown     : function () { if (this.player) { this.player.moveDown(false);   } },
    keyUpRight    : function () { if (this.player) { this.player.moveRight(false);  } },

  });

});