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
    initialize: function(opt) {

      this.scene = this.initScene({
        container: opt.container
      });
      this.map = this.createMap({
        fileUri: 'src/maps/1.json'
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