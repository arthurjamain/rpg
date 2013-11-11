/* globals define */
define([
  'jquery',
  'underscore',
  'js/utils/geometry',
  'js/game/Drawable'
], function (
  $,
  _,
  geometry,
  Drawable
) {

  return Drawable.extend({

    position: { x: 0, y: 0 },

    initialize: function (opt) {

      Drawable.prototype.initialize.call(this, opt);

      _.extend(this.position, opt.spawn || { x: 0, y: 0});
      this.dimensions = opt.dimensions || { width: 1, height: 1 };
      this.speed = opt.speed || 10;
      this.orientation = { name: 'up', angle: 0 };
    },

    getOrientation: function (mvts) {
      var keys = _.keys(mvts);
      if (keys.length > 1) {
        var a1 = mvts[keys[0]];
        var a2 = mvts[keys[1]];

        var bigger = Math.max(a1, a2);
        var smaller = a1 === bigger ? a2 : a1;
        var name;

        if (keys[0] === 'up' || keys[0] === 'down') {
          name = keys[0] + '-' + keys[1];
        } else {
          name = keys[1] + '-' + keys[0];
        }

        return {name: name, angle: (bigger - (bigger - smaller) / 2), bi: true};

      } else if (keys.length === 1) {
        return {name: keys[0], angle: mvts[keys[0]], bi: false};
      } else {
        return this.orientation;
      }

    },

    getHitBox: function () {
      return [
        geometry.rotate(this.position.x, this.position.y, (this.position.x - this.hbw / 2), (this.position.y - this.hbh / 2), this.orientation.angle),
        geometry.rotate(this.position.x, this.position.y, (this.position.x + this.hbw / 2), (this.position.y - this.hbh / 2), this.orientation.angle),
        geometry.rotate(this.position.x, this.position.y, (this.position.x + this.hbw / 2), (this.position.y + this.hbh / 2), this.orientation.angle),
        geometry.rotate(this.position.x, this.position.y, (this.position.x - this.hbw / 2), (this.position.y + this.hbh / 2), this.orientation.angle)
      ];
    },

    draw: function (ctx) {


      this.hbw = this.dimensions.width * ctx.widthRatio;
      this.hbh = this.dimensions.height * ctx.heightRatio;

      Drawable.prototype.draw.call(this, ctx);


      var movements = {};

      if (this.movingLeft && !this.collidingLeft) {
        movements.left = 3 * Math.PI / 2;
      }
      if (this.movingRight && !this.collidingRight) {
        movements.right = Math.PI / 2;
      }
      if (this.movingUp && !this.collidingUp) {
        movements.up = 0;
      }
      if (this.movingDown && !this.collidingDown) {
        movements.down = Math.PI;
      }

      if (this.movingUp || this.movingDown || this.movingLeft || this.movingRight) {
        this.assignQuadrants(ctx);
      }

      this.orientation = this.getOrientation(movements);


      var xPos = this.position.x, yPos = this.position.y;
      if (this.movingLeft) {
        xPos = this.position.x - 10 * ctx.sinceLastFrameRatio * ctx.widthRatio;
      }
      if (this.movingRight) {
        xPos = this.position.x + 10 * ctx.sinceLastFrameRatio * ctx.widthRatio;
      }
      if (this.movingUp) {
        yPos = this.position.y - 10 * ctx.sinceLastFrameRatio * ctx.heightRatio;
      }
      if (this.movingDown) {
        yPos = this.position.y + 10 * ctx.sinceLastFrameRatio * ctx.heightRatio;
      }


      var collisions = ctx.scene.resolveCollisions(this);

      _.each(collisions, function (col) {
        for (var i = 0 ; i < col.collisions.length ; i += 1) {
          this[col.collisions[i]] = true;
        }

        if (this.collidingDown || this.collidingLeft || this.collidingUp || this.collidingRight) {
          var edge = col.obj.getClosestEdge({x: this.position.x, y: this.position.y});

          var normal = {x: - (edge[1].y - edge[0].y), y: edge[1].x - edge[0].x};

          var angle = Math.atan2(normal.y - 0, normal.x - 0);
          console.log(normal, angle * 180/Math.PI);
        }

      }.bind(this));


      if (this.collidingDown) {
        yPos = this.position.y - 1;
      }
      if (this.collidingUp) {
        yPos = this.position.y + 1;
      }
      if (this.collidingLeft) {
        xPos = this.position.x + 1;
      }
      if (this.collidingRight) {
        xPos = this.position.x - 1;
      }
      this.previousPosition = this.position;
      this.position.x = xPos;
      this.position.y = yPos;
      this.drawModel(ctx);
    },

    drawModel: function (ctx) {

      var hb = this.getHitBox();
      ctx.beginPath();
      ctx.moveTo(
        hb[0].x,
        hb[0].y
      );
      ctx.lineTo(
        hb[1].x,
        hb[1].y
      );
      ctx.lineTo(
        hb[2].x,
        hb[2].y
      );
      ctx.lineTo(
        hb[3].x,
        hb[3].y
      );
      ctx.lineTo(
        hb[0].x,
        hb[0].y
      );
      ctx.fillStyle = '#953A8C';
      ctx.fill();
      ctx.restore();

    },

    assignQuadrants: function (ctx) {

      var xSpan = Math.floor((this.hbw) / ctx.scene.map.quadrantWidth);
      var ySpan = Math.floor((this.hbh) / ctx.scene.map.quadrantHeight);
      var biggestDimension = Math.max(this.hbh, this.hbw);

      var minXQuadrant = Math.floor((this.position.x - biggestDimension / 2) / ctx.scene.map.quadrantWidth);
      var minYQuadrant = Math.floor((this.position.y - biggestDimension / 2) / ctx.scene.map.quadrantHeight);

      this.quadrants = { x: minXQuadrant, y: minYQuadrant, width: xSpan, height: ySpan };

    },

    getOrientedWidth: function () {
      switch (this.orientation.name) {
      case 'up':
      case 'down':
        return this.hbw;
      case 'left':
      case 'right':
        return this.hbh;
      case 'up-left':
      case 'down-right':
      case 'down-left':
      case 'up-right':
        return this.hbw - this.hbw / 3;
      }
    },
    getOrientedHeight: function () {
      switch (this.orientation.name) {
      case 'up':
      case 'down':
        return this.hbh;
      case 'left':
      case 'right':
        return this.hbw;
      case 'up-left':
      case 'down-right':
      case 'down-left':
      case 'up-right':
        return this.hbh - this.hbh / 3;
      }
    }

  });
});