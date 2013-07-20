// Constructor
function Polygon(points, options) {
  if (!(this instanceof Polygon)) return new Polygon(points, options);
  this.points = points || [];
  Path.call(this, [], options);
}

// Parent
var Path = require('./Path.js');
Polygon.prototype = Path();

// Prototype
Polygon.prototype.constructor = Polygon;
Polygon.prototype.offset = function (dx, dy) {
  var pointsLength = this.points.length;
  for (var i = 0; i < pointsLength; ++i) {
    this.points[i].offset(dx, dy);
  }
  return this;
};
Polygon.prototype.setupSegments = function () {
  var pointsLength = this.points.length;
  for (var i = 0; i < pointsLength; ++i) {
    var next = i + 1;
    if (this.points.length == next) next = 0;
    this.addBezier([
      this.points[i],
      this.points[next]
    ]);
  }
};

// Exports
module.exports = Polygon;
