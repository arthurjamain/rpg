define([
  'jquery',
  'underscore',
  'js/utils/geometry',
  'js/game/Object'
], function (
  $,
  _,
  Geometry,
  BaseObject
) {

  return BaseObject.extend({

    drawables: [],
    collidables: [],
    borders: null,
    ranges: [],
    player: null,
    mobs: [],
    initialize: function (opt) {

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

    initCanvas: function () {
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

      // Apply some layout styles
      this.$container[0].style.position = 'relative;';
      this.drawerCanvas.style.display = 'none';
      var style = {
        position  : 'absolute',
        top       : 0,
        left      : 0,
        right     : 0,
        bottom    : 0
      };
      _.extend(this.mapCanvas.style, style);
      _.extend(this.mobCanvas.style, style);

      // To the DOM we go.
      this.$container.append(this.mapCanvas);
      this.$container.append(this.mobCanvas);
      this.$container.append(this.drawerCanvas);

      console.info('Canvases initialized.');
    },

    // The actual main drawing loop
    draw: function () {

      this.resetCollitions();

      var sinceLastFrame = Date.now() - (this.lastFrame || 0);
      var sinceLastFrameRatio = sinceLastFrame / 1000;

      this.lastFrame = Date.now();

      for (var k in this.drawables) {
        var ctx;
        if (this.drawables[k].id === 'map') {
          ctx = this.mapCtx;
        } else {
          this.mobCanvas.width = this.mobCanvas.width; // clear canvas
          ctx = this.mobCtx;
        }

        ctx.widthRatio = this.map.widthRatio;
        ctx.heightRatio = this.map.heightRatio;
        ctx.sinceLastFrame = sinceLastFrame;
        ctx.sinceLastFrameRatio = sinceLastFrameRatio;
        ctx.scene = this;

        this.drawables[k].draw(ctx);
      }
      window.requestAnimationFrame(this.draw.bind(this));
    },
    resetCollitions: function () {
      this.player.collidingLeft = false;
      this.player.collidingRight = false;
      this.player.collidingUp = false;
      this.player.collidingDown = false;
    },
    resolveCollisions: function (mob) {
      var hb = mob.getHitBox();
      if (this.map.borders) {
        /*
        if (mob.position.x - (mob.getOrientedWidth() / 2) < this.map.borders.pxWidth) {
          mob.collidingLeft = true;
          mob.position.x = this.map.borders.pxWidth + mob.getOrientedWidth() / 2 - 1;
        }
        else if (mob.position.x + (mob.getOrientedWidth() / 2) > this.map.pxWidth - this.map.borders.pxWidth) {
          mob.collidingRight = true;
          mob.position.x = this.map.pxWidth - this.map.borders.pxWidth - mob.getOrientedWidth() / 2 + 1;
        }
        if (mob.position.y - (mob.getOrientedHeight() / 2) < this.map.borders.pxHeight) {
          mob.collidingUp = true;
          mob.position.y = this.map.borders.pxHeight + mob.getOrientedHeight() / 2 - 1;
        }
        else if (mob.position.y + (mob.getOrientedHeight() / 2) > this.map.pxHeight - this.map.borders.pxHeight) {
          mob.collidingDown = true;
          mob.position.y = this.map.pxHeight - this.map.borders.pxHeight - mob.getOrientedHeight() / 2 + 1;
        }
        */
      }
      var collisions = [];
      _.each(this.map.collidables, function (collidable) {

        if (mob.quadrants && Geometry.doParallelRectanglesCollide(mob.quadrants, collidable.quadrants)) {
          if (Geometry.doPolygonsIntersect(hb, collidable.scaledRange)) {

            var parts = mob.orientation.name.split('-');
            var collisionNames = [];
            _.each(parts, function (val) {
              collisionNames.push('colliding' + val.capitalize());
            });
            collisions.push({obj: collidable, collisions: collisionNames});

          }

        }
      }.bind(this));

      return collisions;

    },
    add: function (drawable) {

      this.drawables.push(drawable);

      if (drawable.id === 'player') {
        this.player = drawable;
      }
      else if (drawable.id === 'map') {
        this.map = drawable;
      }
      if (drawable.id === 'borders') {
        this.borders = drawable;
      }

    },
    remove: function (drawable) {
      var index = this.drawables.indexOf(drawable);
      this.drawables.splice(index, 1);
    }

  });

});