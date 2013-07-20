// Constructor
function Point(x, y) {
  if (!(this instanceof Point)) return new Point(x, y);
  this.x = x;
  this.y = y;
}

// Prototype
Point.prototype = {
  constructor: Point,
  offset: function (dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  },
  distanceFrom: function (point) {
    var dx = this.x - point.x;
    var dy = this.y - point.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  makePath: function (ctx) {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + .05, this.y);
  }
};

// Exports
module.exports = Point;
