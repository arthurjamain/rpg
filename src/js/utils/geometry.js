define([], function () {


  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  return {

    sign: function(x) { return x ? x < 0 ? -1 : 1 : 0; },
    getOrientedTranslationMatrix: function (dir) {

      switch (dir) {
      case 'up':
        return {x: 0, y: 1};
      case 'down':
        return {x: 0, y: -1};
      case 'left':
        return {x: -1, y: 0};
      case 'right':
        return {x: 1, y: 0};
      case 'up-left':
        return {x: -1, y: 1};
      case 'up-right':
        return {x: 1, y: 1};
      case 'down-left':
        return {x: -1, y: -1};
      case 'down-right':
        return {x: 1, y: -1};
      }

      return {x: 0, y: 0};

    },
    // rotate {x, y} of 'radian' degrees around {cx, cy}
    rotate : function (cx, cy, x, y, radians) {
      var cos = Math.cos(radians),
          sin = Math.sin(radians),
          nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
          ny = (sin * (x - cx)) + (cos * (y - cy)) + cy;
      return { x: nx, y: ny };
    },
    doParallelRectanglesCollide: function (a, b) {
      return !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);
    },
    /**
     * Helper function to determine whether there is an intersection between the two polygons described
     * by the lists of vertices. Uses the Separating Axis Theorem
     *
     * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
     * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
     * @return true if there is any intersection between the 2 polygons, false otherwise
     */
    doPolygonsIntersect: function (a, b) {
      var polygons = [a, b];
      var minA, maxA, projected, i, i1, j, minB, maxB;
      var isUndefined = function (obj) {
        return typeof obj === 'undefined';
      };

      for (i = 0; i < polygons.length; i += 1) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1 += 1) {

          // grab 2 vertices to create an edge
          var i2 = (i1 + 1) % polygon.length;
          var p1 = polygon[i1];
          var p2 = polygon[i2];

          // find the line perpendicular to this edge
          var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

          minA = maxA = undefined;
          // for each vertex in the first shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          for (j = 0; j < a.length; j += 1) {
            projected = normal.x * a[j].x + normal.y * a[j].y;
            if (isUndefined(minA) || projected < minA) {
              minA = projected;
            }
            if (isUndefined(maxA) || projected > maxA) {
              maxA = projected;
            }
          }

          // for each vertex in the second shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          minB = maxB = undefined;
          for (j = 0; j < b.length; j += 1) {
            projected = normal.x * b[j].x + normal.y * b[j].y;
            if (isUndefined(minB) || projected < minB) {
              minB = projected;
            }
            if (isUndefined(maxB) || projected > maxB) {
              maxB = projected;
            }
          }

          // if there is no overlap between the projects, the edge we are looking at separates the two
          // polygons, and we know there is no overlap
          if (maxA < minB || maxB < minA) {
            return false;
          }
        }
      }
      return true;
    },
    sqr: function (x) { return x * x; },
    dist2: function (v, w) { return this.sqr(v.x - w.x) + this.sqr(v.y - w.y); },
    distToSegmentSquared: function (p, v, w) {
      var l2 = this.dist2(v, w);
      if (l2 === 0) { return this.dist2(p, v); }
      var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      if (t < 0) { return this.dist2(p, v); }
      if (t > 1) { return this.dist2(p, w); }
      return this.dist2(p, { x: v.x + t * (w.x - v.x),
                        y: v.y + t * (w.y - v.y) });
    },
    distToSegment: function (p, v, w) { return Math.sqrt(this.distToSegmentSquared(p, v, w)); }
  };
});