define([
  'jquery',
  'js/game/Object'
], function(
  $,
  BaseObject
) {

  return BaseObject.extend({

    drawables: [],
    initialize: function(opt) {

      // Assign default values
      _.defaults(opt, {
        container   : document.body,
        width       : 800,
        height      : 600
      });

      // Store / format values
      this.$container = $('#' + opt.container);
      this.width = opt.width;
      this.height = opt.height;

      // Init
      this.initCanvas();

      console.info('Scene initialized.');
    },

    initCanvas: function() {
      this.mapCanvas = document.createElement('canvas');
      this.mapCanvas.className = 'mapdisplayer';
      this.mapCanvas.width = this.width;
      this.mapCanvas.height = this.height;
      this.mapCtx = this.mapCanvas.getContext('2d');

      this.mobCanvas = document.createElement('canvas');
      this.mobCanvas.className = 'mobdisplayer';
      this.mobCanvas.width = this.width;
      this.mobCanvas.height = this.height;
      this.mobCtx = this.mobCanvas.getContext('2d');

      // Unused for now but should be used for offscreen rendering
      this.drawerCanvas = document.createElement('canvas');
      this.drawerCanvas.className = 'drawer';
      this.drawerCanvas.width = this.width;
      this.drawerCanvas.height = this.height;

      this.$container.append(this.mapCanvas);
      this.$container.append(this.mobCanvas);
      this.$container.append(this.drawerCanvas);

      console.info('Canvases initialized.');
    },

    // The actual main drawing loop
    draw: function() {
      for (var k in this.drawables) {
        var ctx = (this.drawables[k].name === 'map') ? this.mapCtx : this.mobCtx;
        this.drawables[k].draw(ctx)
      }
      requestAnimationFrame(this.draw.bind(this));
    },

    add: function(drawable) {
      if (this.drawables.indexOf(drawable) < 0) {
        this.drawables.push(drawable);
      }
    },

    remove: function(drawable) {
      var index = this.drawables.indexOf(drawable);
      this.drawables.splice(index, 1);
    }

  });

})