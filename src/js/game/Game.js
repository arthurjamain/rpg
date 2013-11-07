define([
  'jquery',
  'js/game/Object',
  'js/game/Scene',
  'js/game/Map'
], function(
  $,
  BaseObject,
  Scene,
  Map
) {

  return BaseObject.extend({
    width: 800,
    height: 600,

    initialize: function(opt) {

      this.width = opt.width || this.width;
      this.height = opt.height || this.height;

      this.scene = this.initScene({
        container: opt.container,
        width: this.width,
        height: this.height
      });

      this.map = this.createMap({
        fileUri: 'src/maps/1.json',
        game: this,
        width: this.width,
        height: this.height
      });

      this.map.on('ready', function(map) {
        this.scene.add(map);
        this.scene.draw();
      }.bind(this));

    },
    initScene: function(opt) {
      return new Scene(opt);
    },
    createMap: function(opt) {
      return new Map(opt);
    }

  });

});